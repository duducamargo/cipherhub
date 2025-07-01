import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Home from "./pages/Home";
import Base64 from "./pages/Base64";
import Sha256 from "./pages/Sha256";
import Rsa from "./pages/Rsa";
import NotFound from "./pages/NotFound";
import PageLoader from "./components/PageLoader.tsx";
import { useLoading } from "./contexts/LoadingContext.tsx";

function App() {
  const { isLoading, showLoading } = useLoading(); 
  const location = useLocation();

  const lastPathname = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== lastPathname.current) {
      showLoading();
      lastPathname.current = location.pathname; 
    }
  }, [location.pathname, showLoading]);

  return (
    <div>
      {isLoading && <PageLoader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/base64" element={<Base64 />} />
        <Route path="/sha256" element={<Sha256 />} />
        <Route path="/rsa" element={<Rsa />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
