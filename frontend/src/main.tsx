import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 

import App from './App.tsx'
import Navbar from './components/layouts/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
    <App />
    </BrowserRouter>
  </StrictMode>,
)
