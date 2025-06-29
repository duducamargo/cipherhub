"use client";

import { useState } from "react";
import axios from "axios";
import { HyperText } from "@/components/ui/hyper-text";
import { DetailsCard } from "@/components/DetailsCard";

export default function Base64() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("encode");

  const handleProcess = async () => {
    if (mode === "encode") {
      try {
        const response = await axios.post(
          "http://localhost:3001/base64/encode",
          {
            text: input,
          }
        );

        console.log("Resposta da API:", response.data.result);
        setOutput(response.data.result);
      } catch (error) {
        console.error("Erro ao processar:", error);
        setOutput("Erro ao se comunicar com a API.");
      }
    } else if (mode === "decode") {
      try {
        const response = await axios.post(
          "http://localhost:3001/base64/decode",
          {
            text: input,
          }
        );

        console.log("Resposta da API:", response.data.result);
        setOutput(response.data.result);
      } catch (error) {
        console.error("Erro ao processar:", error);
        setOutput("Erro ao se comunicar com a API.");
      }
    } else {
      setOutput("Modo inválido. Selecione codificar ou decodificar.");
    }
  };

  return (
    <div className="min-h-screen bg-[#111] text-white px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl mt-20 md:text-4xl font-bold mb-12 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
        Conversor Base64
      </h1>

      <DetailsCard
        algorithmName="Base64"
        algorithmType="Codificação (não criptográfica)"
        structure="Transformação binária para texto ASCII usando blocos de 6 bits"
        isReversible={true}
        implementationDifficulty="Baixa"
        commonUses="Envio de dados binários via texto (e.g., e-mails, URLs), armazenamento de imagens"
        securityLevel={2}
      />

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

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
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
              className={`px-4 py-2 rounded font-medium transition-colors duration-200 ${
                mode === "decode"
                  ? "bg-purple-600 text-white"
                  : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              }`}
              onClick={() => setMode("decode")}
            >
              Decodificar
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
        <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg md:max-w-[479px]">
          <label className="block text-sm font-semibold mb-2">Resultado:</label>
          <div className="w-full max-w-[479px] h-48 p-3 rounded bg-neutral-800 text-white overflow-auto">
            {output ? (
              <HyperText
                className="max-w-[479px] break-words"
                startOnView={false}
                animateOnHover={false}
              >
                {output}
              </HyperText>
            ) : (
              <p className="text-neutral-500">
                O resultado será exibido aqui...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
