// src/components/rsa/ChatHeader.tsx
import React from "react";
import { KeyRound, Zap } from "lucide-react";
import { STATIC_D, STATIC_N, type ChatHeaderProps } from "./types";

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  nKey,
  setNKey,
  eKey,
  setEKey,
  handleGenerateKeys,
  currentMode,
}) => {
  return (
    <div className="p-4 border-b border-neutral-800 bg-neutral-800 flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="n-key"
            className="text-xs font-semibold text-neutral-300"
          >
            N (Módulo)
          </label>
          <input
            id="n-key"
            type="text"
            className="w-full p-2 rounded bg-neutral-700 text-white outline-none text-sm border border-neutral-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            value={nKey}
            onChange={(e) => setNKey(e.target.value)}
            placeholder="Insira o valor de N"
            disabled={currentMode === "decrypt"} // Desabilitado se modo descriptografar
          />
        </div>
        {currentMode === "encrypt" ? (
          <div className="flex flex-col gap-1">
            <label
              htmlFor="e-key"
              className="text-xs font-semibold text-neutral-300"
            >
              E (Pública)
            </label>
            <input
              id="e-key"
              type="text"
              className="w-full p-2 rounded bg-neutral-700 text-white outline-none text-sm border border-neutral-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              value={eKey}
              onChange={(e) => setEKey(e.target.value)}
              placeholder="Insira o valor de E"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-1 bg-neutral-700 p-2 rounded border border-neutral-600">
            <label className="text-xs font-semibold text-neutral-300 flex items-center gap-1">
              <Zap size={14} className="text-blue-400" /> Chaves de
              Descriptografia (Estáticas)
            </label>
            <p className="text-white text-sm">
              N: <span className="font-mono text-blue-300">{STATIC_N}</span>
            </p>
            <p className="text-white text-sm">
              D: <span className="font-mono text-blue-300">{STATIC_D}</span>
            </p>
          </div>
        )}
      </div>
      {currentMode === "encrypt" && (
        <button
          className="w-full cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors transform hover:scale-[1.01] active:scale-95"
          onClick={handleGenerateKeys}
        >
          <KeyRound className="inline-block mr-2" size={18} /> Gerar Chaves
        </button>
      )}
    </div>
  );
};
