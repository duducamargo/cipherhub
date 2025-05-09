import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white flex items-center justify-center">
      <div className="text-center p-8 bg-slate-800 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to CipherHub</h1>
        <p className="text-lg mb-6">
          Explore encryption algorithms like <span className="font-semibold">SHA-256</span>, <span className="font-semibold">RSA</span>, and <span className="font-semibold">Base64</span>.
        </p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition">
          Start Testing
        </button>
      </div>
    </div>
  );
}
