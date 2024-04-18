// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
 // Import AuthProvider
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes'; // Import Routes

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <RouterProvider router={routes} />
    
  </React.StrictMode>
);

