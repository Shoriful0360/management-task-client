import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import MainRoute from './Route/MainRoute.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
 
} from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
 <div className='bg-[#5C8BCE]'>
 <AuthProvider>
  <MainRoute/>
  <Toaster   position="top-center"
  reverseOrder={false} />
  </AuthProvider>
 </div>
    </BrowserRouter>
    </QueryClientProvider>
  
  </StrictMode>,
)
