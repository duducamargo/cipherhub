import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 

import App from './App.tsx'
import Navbar from './components/layouts/Navbar.tsx'
import Footer from './components/layouts/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
    <App />
    <Footer />
    </BrowserRouter>
  </StrictMode>,
)
