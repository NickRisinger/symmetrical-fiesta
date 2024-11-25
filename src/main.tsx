import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import App from './App';

import '@mantine/core/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </MantineProvider>
  </React.StrictMode>,
);
