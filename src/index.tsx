import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ListProvider } from './contexts/ListContext';
import NotificationProvider from './contexts/NotificationContext';

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <ListProvider>
        <App />
      </ListProvider>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
