import { FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-[#111] text-neutral-400 py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Esquerda - Direitos autorais */}
        <div className="flex items-center gap-2 text-sm">
          <FaCopyright className="text-xs" />
          <span>2025 CipherHub, Inc</span>
        </div>

        {/* Centro - Ícone (personalizável) */}
        <div>
          <div className=" text-black rounded-md px-2 py-1 text-lg font-semibold">
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
              CipherHub
            </span>
          </div>
        </div>

        {/* Direita - Navegação */}
        <ul className="flex gap-5 text-sm font-medium text-neutral-300">
          <li>
            <a href="/" className="hover:text-white">
              Início
            </a>
          </li>
          <li>
            <a href="/sha256" className="hover:text-white">
              SHA-256
            </a>
          </li>
          <li>
            <a href="/rsa" className="hover:text-white">
              RSA
            </a>
          </li>
          <li>
            <a href="/sobre" className="hover:text-white">
              Sobre
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
