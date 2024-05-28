import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@components'
import '@css/index.css'
import '@css/custom.css'
import { BrowserRouter as Router } from 'react-router-dom';
import {
  NetworkContextProvider,
  CampaignContextProvider
} from '@context';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <NetworkContextProvider>
      <CampaignContextProvider>
        <Router>
          <App />
        </Router>
      </CampaignContextProvider>
    </NetworkContextProvider>
  </React.StrictMode>
)
