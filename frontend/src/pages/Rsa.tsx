"use client";

import CodeRSA from "@/components/CodeRSA";
import { DetailsCard } from "@/components/DetailsCard";
import { useState } from "react";

export default function Rsa() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encrypt");

  // Chaves
  const [n, setN] = useState("");
  const [e, setE] = useState("");
  const [d, setD] = useState("");

  const handleProcess = () => {
    if (mode === "encrypt") {
      if (!n || !e) {
        setOutput("Por favor, insira a chave pública (n e e).");
        return;
      }
      setOutput(`Texto criptografado simulado para: "${input}"`);
    } else {
      if (!n || !d) {
        setOutput("Por favor, insira a chave privada (n e d).");
        return;
      }
      setOutput(`Texto descriptografado simulado para: "${input}"`);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl mt-20 md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        Conversor RSA
      </h1>

      <DetailsCard
        algorithmName="RSA"
        algorithmType="Criptografia Assimétrica"
        structure="Chaves pública e privada com base em fatoração de primos"
        isReversible={true}
        implementationDifficulty="Alta, especialmente para gerar chaves e operar com grandes primos"
        commonUses="Troca segura de chaves, assinatura digital, comunicação segura"
        securityLevel={4}
      />

      <div className="flex gap-6 flex-col md:flex-row w-full max-w-5xl mb-12">
        {/* Entrada */}
        <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg">
          <label className="block text-sm font-semibold mb-2">
            Texto de entrada:
          </label>
          <textarea
            className="w-full h-32 p-3 rounded bg-neutral-800 text-white resize-none outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite o texto aqui..."
          ></textarea>

          {/* Chaves */}
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-semibold">
              Chave n (módulo):
            </label>
            <input
              type="text"
              className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
              value={n}
              onChange={(e) => setN(e.target.value)}
              placeholder="Insira o valor de n"
            />
            {mode === "encrypt" ? (
              <>
                <label className="block text-sm font-semibold mt-2">
                  Chave e (pública):
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
                  value={e}
                  onChange={(e) => setE(e.target.value)}
                  placeholder="Insira o valor de e"
                />
              </>
            ) : (
              <>
                <label className="block text-sm font-semibold mt-2">
                  Chave d (privada):
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-neutral-800 text-white outline-none"
                  value={d}
                  onChange={(e) => setD(e.target.value)}
                  placeholder="Insira o valor de d"
                />
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
                mode === "encrypt"
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
              onClick={() => setMode("encrypt")}
            >
              Criptografar
            </button>
            <button
              className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
                mode === "decrypt"
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
              onClick={() => setMode("decrypt")}
            >
              Descriptografar
            </button>
            <button
              className="sm:ml-auto px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
              onClick={handleProcess}
            >
              Processar
            </button>
          </div>
        </div>

        {/* Resultado */}
        <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg">
          <label className="block text-sm font-semibold mb-2">Resultado:</label>
          <textarea
            className="w-full h-48 p-3 rounded bg-neutral-800 text-white resize-none outline-none"
            value={output}
            readOnly
          ></textarea>
        </div>
      </div>

      <CodeRSA />
    </div>
  );
}
