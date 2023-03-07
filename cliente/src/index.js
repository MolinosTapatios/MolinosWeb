import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.css';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from 'context/UserContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
);
