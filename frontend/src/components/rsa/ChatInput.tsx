import React from "react";
import { SendHorizonal, Lock } from "lucide-react";
import type { ChatInputProps } from "./types";

export const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  currentMode,
  setCurrentMode,
  handleProcessMessage,
}) => {
  return (
    <div className="p-4 border-t border-neutral-800 bg-neutral-800 flex flex-wrap items-center gap-3 sm:flex-nowrap">
      <button
        className={`flex-shrink-0 px-4 py-2 max-sm:w-full rounded-lg font-medium transition-all duration-200 text-sm transform hover:scale-[1.01] active:scale-95
          ${currentMode === "encrypt"
            ? "bg-purple-600 text-white shadow-purple-900/50 shadow-md"
            : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
          }
          w-full sm:w-auto`}
        onClick={() => setCurrentMode("encrypt")}
      >
        <Lock size={16} className="inline-block mr-1" /> Criptografar
      </button>

      <input
        type="text"
        className="flex-1 min-w-[150px] p-3 rounded-lg bg-neutral-700 text-white outline-none border border-neutral-600 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm shadow-inner" 
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleProcessMessage();
          }
        }}
        placeholder="Digite a mensagem para criptografar..."
      />
      
      <button
        className="max-sm:flex items-center justify-center gap-3 flex-shrink-0 cursor-pointer p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all transform hover:scale-[1.05] active:scale-95 shadow-md shadow-pink-900/50
          w-full sm:w-auto order-last sm:order-none"
        onClick={handleProcessMessage}
      >
        <span className="block sm:hidden">Enviar mensagem</span>
        <SendHorizonal size={20} />
      </button>
    </div>
  );
};