import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components'
import '@css/index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import {
  NetworkContextProvider
} from '@context';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <NetworkContextProvider>
      <Router>
        <App />
      </Router>
    </NetworkContextProvider>
  </React.StrictMode>
)
