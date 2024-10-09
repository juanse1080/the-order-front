import React, { createContext, useContext, useState } from 'react';
import { SelectedLineItem } from '../interfaces';

interface ShippingCartContextValue {
  lineItems: SelectedLineItem[];
  addLineItem: (lineItem: SelectedLineItem) => void;
  removeLineItem: (index: number) => void;
  updateQuantity: (index: number, newQuantity: number) => void;
  takeaway: boolean;
  setTakeaway: (takeaway: boolean) => void;
  customerName: string;
  reset: () => void;
  setCustomerName: (customerName: string) => void;
  anchorEl: HTMLButtonElement | null;
  handleAnchorEL: (element: HTMLButtonElement) => void;
  handleShippingCartClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleShippingCartClose: () => void;
}

const ShippingCartContext = createContext<ShippingCartContextValue>(
  {} as ShippingCartContextValue
);

interface ShippingCartProviderProps {
  children: React.ReactNode;
}

export const ShoppingCartProvider = ({
  children
}: ShippingCartProviderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [lineItems, setLineItems] = useState<SelectedLineItem[]>([]);
  const [takeaway, setTakeaway] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const addLineItem = (lineItem: SelectedLineItem) => {
    setLineItems([...lineItems, lineItem]);
  };

  const removeLineItem = (index: number) => {
    const newLineItems = [...lineItems];
    newLineItems.splice(index, 1);
    setLineItems(newLineItems);
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity > 0) {
      const newLineItems = [...lineItems];
      newLineItems[index].qyt_ordened = newQuantity;
      setLineItems(newLineItems);
    }
  };

  const reset = () => {
    setLineItems([]);
    setTakeaway(false);
    setCustomerName('');
    setAnchorEl(null);
  };

  const handleAnchorEL = (element: HTMLButtonElement) => {
    setAnchorEl(element);
  };

  const handleShippingCartClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => handleAnchorEL(event.currentTarget);

  const handleShippingCartClose = () => setAnchorEl(null);

  return (
    <ShippingCartContext.Provider
      value={{
        lineItems,
        addLineItem,
        removeLineItem,
        updateQuantity,
        takeaway,
        setTakeaway,
        customerName,
        reset,
        setCustomerName,
        anchorEl,
        handleAnchorEL,
        handleShippingCartClick,
        handleShippingCartClose
      }}
    >
      {children}
    </ShippingCartContext.Provider>
  );
};

export const shoppingCartContext = () => useContext(ShippingCartContext);
