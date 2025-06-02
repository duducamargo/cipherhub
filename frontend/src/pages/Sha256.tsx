"use client";

import { useState } from "react";

export default function Sha256() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const handleProcess = () => {
    try {
      const result = decodeURIComponent(escape(atob(input)));
      setOutput(result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setOutput("Erro ao processar. Verifique se o texto está correto.");
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl mt-20 md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        Conversor Sha-256
      </h1>

      <div className="flex gap-6 flex-col md:flex-row w-full max-w-5xl">
        {/* Entrada */}
        <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg">
          <label className="block text-sm font-semibold mb-2">
            Texto de entrada:
          </label>
          <textarea
            className="w-full h-48 p-3 rounded bg-neutral-800 text-white resize-none outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite o texto aqui..."
          ></textarea>

          <div className="flex gap-4 mt-4">
            <button
              className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
                mode === "encode"
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
              onClick={() => setMode("encode")}
            >
              Codificar
            </button>
            <button
              className="ml-auto px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
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
    </div>
  );
}
