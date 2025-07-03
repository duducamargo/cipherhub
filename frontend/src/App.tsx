import { Suspense, lazy } from "react"; 
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import PageLoader from "./components/PageLoader.tsx"; 
import { useLoading } from "./contexts/LoadingContext.tsx";

const Home = lazy(() => import("./pages/Home"));
const Base64 = lazy(() => import("./pages/Base64"));
const Sha256 = lazy(() => import("./pages/Sha256"));
const Rsa = lazy(() => import("./pages/Rsa"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/base64" element={<Base64 />} />
          <Route path="/sha256" element={<Sha256 />} />
          <Route path="/rsa" element={<Rsa />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
