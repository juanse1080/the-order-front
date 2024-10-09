import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';
import App from './App.tsx';
import { fetcher } from './constants';
import { UserProvider } from './contexts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <SWRConfig value={{ fetcher }}>
        <CssBaseline />
        <App />
      </SWRConfig>
    </UserProvider>
  </StrictMode>
);
