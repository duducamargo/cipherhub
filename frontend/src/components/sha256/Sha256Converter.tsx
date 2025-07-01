import React from "react";
import { HyperText } from "@/components/ui/hyper-text"; 
import { Lock, SendHorizonal } from "lucide-react"; 

interface Sha256ConverterProps {
  input: string;
  setInput: (value: string) => void;
  output: string;
  handleProcess: () => Promise<void>;
}

export const Sha256Converter: React.FC<Sha256ConverterProps> = ({
  input,
  setInput,
  output,
  handleProcess,
}) => {
  return (
    <div className="flex gap-6 flex-col md:flex-row w-full max-w-5xl mb-12">
      {/* Entrada */}
      <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg">
        <label className="block text-sm font-semibold mb-2">
          Texto de entrada:
        </label>
        <textarea
          className="w-full h-48 p-3 rounded bg-neutral-800 text-white resize-none outline-none border border-neutral-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o texto aqui..."
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); 
              handleProcess();
            }
          }}
        ></textarea>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded font-medium transition-colors duration-200 bg-purple-600 text-white cursor-pointer hover:bg-purple-700 outline-none transform hover:scale-[1.01] active:scale-95 shadow-md shadow-purple-900/50`}
            onClick={handleProcess}
          >
            <Lock size={16} className="inline-block mr-1" /> Codificar
          </button>

          <button
            className="sm:ml-auto px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 cursor-pointer outline-none transform hover:scale-[1.01] active:scale-95 shadow-md shadow-pink-900/50"
            onClick={handleProcess}
          >
            <SendHorizonal size={20} className="inline-block mr-1" /> Processar
          </button>
        </div>
      </div>

      {/* Resultado */}
      <div className="flex-1 bg-neutral-900 p-4 rounded-lg shadow-lg md:max-w-[479px] border border-neutral-700">
        <label className="block text-sm font-semibold mb-2">Resultado:</label>
        <div className="w-full max-w-[479px] h-48 p-3 rounded bg-neutral-800 text-white overflow-auto no-visible-scrollbar shadow-inner">
          {" "}
          {/* Adicionado no-visible-scrollbar e shadow-inner */}
          {output ? (
            <HyperText
              className="max-w-[479px] break-words"
              startOnView={true}
              animateOnHover={false}
              duration={1000}
              characterSet={"0123456789abcdef".split("")}
            >
              {output}
            </HyperText>
          ) : (
            <p className="text-neutral-500">
              O hash SHA-256 será exibido aqui...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
