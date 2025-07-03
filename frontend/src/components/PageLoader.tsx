import React from "react";
import { motion } from "framer-motion";

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <motion.div
        className="w-24 h-24"
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 4,
        }}
      >
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <defs>
            <linearGradient id="neon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M32 8C24.268 8 18 14.268 18 22V28H16C14.8954 28 14 28.8954 14 30V52C14 53.1046 14.8954 54 16 54H48C49.1046 54 50 53.1046 50 52V30C50 28.8954 49.1046 28 48 28H46V22C46 14.268 39.732 8 32 8ZM22 22C22 16.4772 26.4772 12 32 12C37.5228 12 42 16.4772 42 22V28H22V22ZM18 32H46V50H18V32Z"
            fill="url(#neon)"
            filter="url(#glow)"
          />
        </motion.svg>
      </motion.div>

      <motion.p
        className="mt-4 text-sm md:text-base text-[#e879f9] font-semibold tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Carregando...
      </motion.p>
    </div>
  );
};

export default PageLoader;
