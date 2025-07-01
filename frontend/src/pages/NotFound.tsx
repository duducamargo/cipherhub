"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";
import { useEffect } from "react";

const NotFound = () => {
  const { hideLoading } = useLoading();

  useEffect(() => {
    hideLoading();
  }, [hideLoading]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none animate-pulse bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-700/10 via-blue-600/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 max-w-xl mx-auto text-center p-6 backdrop-blur-md bg-white/5 rounded-3xl neon-runner-border shadow-[0_0_25px_rgba(168,85,247,0.15)]"
      >
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 drop-shadow-[0_0_0.6rem_#9333ea90]">
          404
        </h1>

        <p className="text-lg mt-4 mb-6 text-gray-300 font-medium">
          Oops! A página que você está tentando acessar não existe ou foi
          movida.
        </p>

        <div className="text-center mb-8">
          <span className="inline-block text-sm text-zinc-400 mb-2">
            Mas não se preocupe...
          </span>
          <div className="text-base font-semibold text-purple-300">
            Você pode voltar ao menu principal e explorar os algoritmos!
          </div>
        </div>

        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 transition-all duration-300 text-white font-semibold shadow-md hover:shadow-xl"
        >
          Voltar para Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
