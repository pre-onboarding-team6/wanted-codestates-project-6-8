import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ListProvider } from './contexts/ListContext';
import NotificationProvider from './contexts/NotificationContext';

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <ListProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ListProvider>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
