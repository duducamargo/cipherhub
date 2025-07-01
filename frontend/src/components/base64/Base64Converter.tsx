// src/components/base64/Base64Converter.tsx
import React from "react";
import { HyperText } from "@/components/ui/hyper-text";
import { Lock, Unlock, SendHorizonal } from "lucide-react"; 

type Base64Mode = "encode" | "decode"; 

interface Base64ConverterProps {
  input: string;
  setInput: (value: string) => void;
  output: string;
  mode: Base64Mode;
  setMode: (mode: Base64Mode) => void;
  handleProcess: () => Promise<void>;
}

export const Base64Converter: React.FC<Base64ConverterProps> = ({
  input,
  setInput,
  output,
  mode,
  setMode,
  handleProcess,
}) => {
  return (
    <div className="flex gap-6 flex-col md:flex-row w-full max-w-5xl mb-12">
      <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg border border-neutral-700">
        {" "}
        <label className="block text-sm font-semibold mb-2">
          Texto de entrada:
        </label>
        <textarea
          className="w-full h-48 p-3 rounded bg-neutral-800 text-white resize-none outline-none border border-neutral-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "encode"
              ? "Digite o texto para codificar..."
              : "Cole o texto Base64 para decodificar..."
          }
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleProcess();
            }
          }}
        ></textarea>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm transform hover:scale-[1.01] active:scale-95 ${
              mode === "encode"
                ? "bg-purple-600 text-white shadow-purple-900/50 shadow-md"
                : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
            }`}
            onClick={() => setMode("encode")}
          >
            <Lock size={16} className="inline-block mr-1" /> Codificar
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm transform hover:scale-[1.01] active:scale-95 ${
              mode === "decode"
                ? "bg-purple-600 text-white shadow-purple-900/50 shadow-md"
                : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
            }`}
            onClick={() => setMode("decode")}
          >
            <Unlock size={16} className="inline-block mr-1" /> Decodificar
          </button>
          <button
            className="sm:ml-auto px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 cursor-pointer outline-none transform hover:scale-[1.05] active:scale-95 shadow-md shadow-pink-900/50"
            onClick={handleProcess}
          >
            <SendHorizonal size={20} className="inline-block mr-1" /> Processar
          </button>
        </div>
      </div>

      <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg md:max-w-[479px] border border-neutral-700">
        {" "}
        <label className="block text-sm font-semibold mb-2">Resultado:</label>
        <div className="w-full max-w-[479px] h-48 p-3 rounded bg-neutral-800 text-white overflow-auto no-visible-scrollbar shadow-inner">
          {output ? (
            <HyperText
              className="max-w-[479px] break-words"
              startOnView={true} 
              animateOnHover={false}
              duration={1000} 
              characterSet={"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(
                ""
              )}
            >
              {output}
            </HyperText>
          ) : (
            <p className="text-neutral-500">O resultado será exibido aqui...</p>
          )}
        </div>
      </div>
    </div>
  );
};
