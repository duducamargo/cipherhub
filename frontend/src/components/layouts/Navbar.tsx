import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Aplica ocultação só em telas md ou maiores (768px+)
      if (window.innerWidth >= 768) {
        setShow(currentY < lastScrollY || currentY < 10);
      } else {
        setShow(true); // em mobile, sempre visível
      }

      setLastScrollY(currentY);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY, menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-[60] w-full border-b border-neutral-800 shadow-md
        backdrop-blur-md backdrop-saturate-200 bg-black/60 transition-transform duration-300
        ${show ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          {/* Logo */}
          <div
            className="text-2xl font-bold text-white tracking-tight cursor-pointer"
            onClick={() => (location.href = "/")}
          >
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
              CipherHub
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-4 sm:gap-6 text-sm md:text-base font-medium text-neutral-200">
            <li>
              <a href="/" className="hover:text-white transition">
                Início
              </a>
            </li>
            <li>
              <a href="/sha256" className="hover:text-white transition">
                SHA-256
              </a>
            </li>
            <li>
              <a href="/rsa" className="hover:text-white transition">
                RSA
              </a>
            </li>
            <li>
              <a href="/sobre" className="hover:text-white transition">
                Sobre
              </a>
            </li>
          </ul>

          {/* Mobile Button */}
          <button
            id="menuButton"
            className="md:hidden text-white z-[70] relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        <aside
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64 bg-[#121212] text-white z-[100]
  transform transition-transform duration-300 ease-in-out shadow-2xl
  ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
  border-r border-purple-600/20`}
          style={{
            height: "100vh",
            width: "16rem",
          }}
        >
          {/* Top bar gradient for visual detail */}
          <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />

          <div
            className="p-6 flex flex-col gap-5 text-2xl font-bold text-white tracking-tight cursor-pointer"
            onClick={() => (location.href = "/")}
          >
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
              CipherHub
            </span>
          </div>

          <div className="p-6 flex flex-col gap-5 text-base font-medium">
            <a
              href="/"
              className="hover:text-purple-400 transition duration-200 ease-in-out"
            >
              Início
            </a>
            <a
              href="/sha256"
              className="hover:text-purple-400 transition duration-200 ease-in-out"
            >
              SHA-256
            </a>
            <a
              href="/rsa"
              className="hover:text-purple-400 transition duration-200 ease-in-out"
            >
              RSA
            </a>
            <a
              href="/sobre"
              className="hover:text-purple-400 transition duration-200 ease-in-out"
            >
              Sobre
            </a>
          </div>
        </aside>
      </header>
      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed w-full h- inset-0 bg-black/70 backdrop-blur-sm z-[9]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
