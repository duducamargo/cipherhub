import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Base64 from "./pages/Base64";
import Sha256 from "./pages/Sha256";
import Rsa from "./pages/Rsa";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/base64"
          element={<Base64 />}
        />
        <Route
          path="/sha256"
          element={<Sha256 />}
        />
        <Route
          path="/rsa"
          element={<Rsa />}
        />
      </Routes>
    </div>
  );
}

export default App;
