import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.scss';
import {BlockchainProvider} from "./BlockchainContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BlockchainProvider>
      <App />
    </BlockchainProvider>
  </React.StrictMode>
);
