import { ShoppingCartProvider, useRestaurantContext } from './contexts';

import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  const { restaurant } = useRestaurantContext();

  if (!restaurant) return <h1>Loading ...</h1>;

  return (
    <ShoppingCartProvider>
      <RouterProvider router={router} />;
    </ShoppingCartProvider>
  );
}

export default App;
