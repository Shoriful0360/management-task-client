import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import MainRoute from './Route/MainRoute.jsx'
import AuthProvider from './provider/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <AuthProvider>
  <MainRoute/>
  </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
