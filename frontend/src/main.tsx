// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import Navbar from "./components/layouts/Navbar.tsx";
import Footer from "./components/layouts/Footer.tsx";
import { LoadingProvider } from "./contexts/LoadingContext.tsx"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <Navbar />
        <App />
        <Footer />
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
