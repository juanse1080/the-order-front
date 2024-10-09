import { Product } from './Product';

export interface LineItem {
  id: number;
  product: Product;
  qyt_ordened: number;
  comments: string;
}

export interface SelectedLineItem {
  product: Product;
  comments: string;
  qyt_ordened: number;
}
