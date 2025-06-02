"use client";

import React, { useState } from "react";

export default function Sha256() {
  const [inputText, setInputText] = useState("");
  const [hashResult, setHashResult] = useState("");

  const handleHash = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    setHashResult(hashHex);
  };

  return (
    <main className="min-h-screen bg-[#111] text-white py-16 px-4 md:px-12 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Teste de Criptografia SHA-256
      </h1>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Entrada */}
        <div className="flex flex-col bg-[#1a1a1a] p-6 rounded-2xl border border-neutral-700 shadow-md">
          <label className="text-lg font-medium mb-2">Texto de entrada</label>
          <textarea
            className="w-full h-48 p-4 bg-[#0f0f0f] text-white rounded-xl border border-neutral-700 resize-none focus:outline-none focus:ring-0"
            placeholder="Digite o texto para gerar o hash SHA-256..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={handleHash}
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-lg font-semibold"
          >
            Gerar SHA-256
          </button>
        </div>

        {/* Resultado */}
        <div className="flex flex-col bg-[#1a1a1a] p-6 rounded-2xl border border-neutral-700 shadow-md">
          <label className="text-lg font-medium mb-2">
            Resultado (SHA-256)
          </label>
          <textarea
            className="w-full h-48 p-4 bg-[#0f0f0f] text-green-400 rounded-xl border border-neutral-700 resize-none"
            readOnly
            value={hashResult}
          />
        </div>
      </div>
    </main>
  );
}
