import { useLoading } from "@/contexts/LoadingContext";
import { FaCopyright } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; 

export default function Footer() {
  const { showLoading } = useLoading();
  const location = useLocation();

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (location.pathname === path) {
      e.preventDefault(); 
      return; 
    }
    showLoading();
  };

  return (
    <footer className="border-t border-neutral-800 bg-[#111] text-neutral-400 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm">
          <FaCopyright className="text-xs" />
          <span>2025 CipherHub, Inc</span>
        </div>

        <div>
          <Link
            to="/"
            className="text-black rounded-md px-2 py-1 text-lg font-semibold"
            onClick={(e) => handleLinkClick(e, "/")} 
          >
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
              CipherHub
            </span>
          </Link>
        </div>

        <ul className="flex gap-5 text-sm font-medium text-neutral-300">
          <li>
            <Link
              to="/"
              className="hover:text-white"
              onClick={(e) => handleLinkClick(e, "/")}
            >
              Início
            </Link>
          </li>
          <li>
            <Link
              to="/sha256"
              className="hover:text-white"
              onClick={(e) => handleLinkClick(e, "/sha256")} 
            >
              SHA-256
            </Link>
          </li>
          <li>
            <Link
              to="/rsa"
              className="hover:text-white"
              onClick={(e) => handleLinkClick(e, "/rsa")} 
            >
              RSA
            </Link>
          </li>
          <li>
            <Link
              to="/base64"
              className="hover:text-white"
              onClick={(e) => handleLinkClick(e, "/base64")} 
            >
              Base 64
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
