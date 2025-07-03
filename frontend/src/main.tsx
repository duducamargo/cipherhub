import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import Navbar from "./components/layouts/Navbar.tsx";
import Footer from "./components/layouts/Footer.tsx";
import { LoadingProvider } from "./contexts/LoadingContext.tsx";
import ScrollToTop from "./hooks/ScrollToTop.tsx";

import './global.css';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <LoadingProvider>
        <Navbar />
        <App />
        <Footer />
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
