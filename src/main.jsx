import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { SocketProvider } from './context/SocketProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <SocketProvider>
      <App />
      </SocketProvider>
 
    </RecoilRoot>
   
  </React.StrictMode>,
)
