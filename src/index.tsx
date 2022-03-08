import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ListProvider } from './contexts/ListContext';
import NotificationProvider from './contexts/NotificationContext';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <NotificationProvider>
        <ListProvider>
          <App />
        </ListProvider>
      </NotificationProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
