import { ShoppingCart } from '@mui/icons-material';
import {
  Alert,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  Popover,
  TextField
} from '@mui/material';
import { useState } from 'react';
import useSWR from 'swr';
import { Content, ProductCard } from '../../components';
import { shoppingCartContext, useRestaurantContext } from '../../contexts';
import { Pagination, Product } from '../../interfaces';
import YourShoppingCart from './YourShoppingCart';

export function ProductSelectionView() {
  const { restaurant } = useRestaurantContext();
  const {
    anchorEl,
    lineItems,
    addLineItem,
    handleShippingCartClick,
    handleShippingCartClose
  } = shoppingCartContext();

  const { data, isLoading } = useSWR<Pagination<Product>>(
    `restaurant/${restaurant.id}/product`
  );

  const products = data?.data || [];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const handleAddToOrder = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setQuantity(1);
    setNotes('');
  };

  const handleConfirmOrder = () => {
    if (selectedProduct) {
      addLineItem({
        product: selectedProduct,
        qyt_ordened: quantity,
        comments: notes
      });
      handleCloseDialog();
    }
  };

  return (
    <>
      <Content
        loading={isLoading}
        appBar={
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleShippingCartClick}
            color="inherit"
          >
            <Badge
              badgeContent={lineItems.reduce(
                (acc, lineItem) => acc + lineItem.qyt_ordened,
                0
              )}
              color="error"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
        }
      >
        <Grid2 container spacing={4}>
          {products.map((product) => (
            <Grid2 key={product.id} columns={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product}>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ borderRadius: 5 }}
                  onClick={() => handleAddToOrder(product)}
                >
                  Agregar
                </Button>
              </ProductCard>
            </Grid2>
          ))}
        </Grid2>
        {products.length === 0 && (
          <Alert severity="info">No hay productos disponibles</Alert>
        )}
      </Content>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <form onSubmit={(e) => e.preventDefault()}>
          <DialogTitle>{selectedProduct?.name}</DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              label="Cantidad"
              type="number"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <TextField
              multiline
              minRows={4}
              margin="dense"
              label="Observaciones"
              type="text"
              fullWidth
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button sx={{ borderRadius: 5 }} onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button
              sx={{ borderRadius: 5 }}
              color="primary"
              variant="contained"
              onClick={handleConfirmOrder}
              type="submit"
            >
              Agregar a la orden
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleShippingCartClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <YourShoppingCart />
      </Popover>
    </>
  );
}
