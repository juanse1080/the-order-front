import { KitchenView } from '../containers/KitchenView/KitchenView';
import { OrdersView } from '../containers/OrdersView/OrdersView';
import { ProductSelectionView } from '../containers/ProductSelectionView/ProductSelectionView';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductSelectionView />
  },
  {
    path: '/kitchen',
    element: <KitchenView />
  },
  {
    path: '/orders',
    element: <OrdersView />
  }
]);
