import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setShow(currentY < lastScrollY);
      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 z-50 w-full px-8 py-6 border-b border-neutral-800 shadow-md
    backdrop-blur-md backdrop-saturate-250 bg-black/55 transition-transform duration-300
    ${show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold text-white tracking-tight">
          <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
            CipherHub
          </span>
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-6 text-sm md:text-base font-medium text-neutral-200">
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
      </nav>
    </header>
  );
}
