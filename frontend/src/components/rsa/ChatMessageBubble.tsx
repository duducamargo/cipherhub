// src/components/rsa/ChatMessageBubble.tsx
import React from "react";
import { Lock, } from "lucide-react";
import type { ChatMessage } from "./types";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
}) => {
  return (
    <div
      key={message.id}
      className={`flex mb-4 ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[75%] p-4 rounded-xl shadow-lg border ${
          message.sender === "user"
            ? "bg-purple-700 text-white border-purple-600 rounded-br-none"
            : "bg-neutral-700 text-neutral-200 border-neutral-600 rounded-bl-none"
        } ${
          message.type === "error"
            ? "bg-red-800 text-white border-red-700"
            : message.type === "info"
            ? "bg-blue-800 text-white border-blue-700"
            : "" // static-keys type will be handled by content.
        }`}
      >
        <p className="font-bold text-sm mb-1 opacity-90">
          {message.sender === "user" ? "Você" : "Sistema"}
        </p>
        <p className="text-sm break-words whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Bloco de Mensagem Criptografada */}
        {message.type === "encrypted" && message.encryptedContent && (
          <div className="mt-3 pt-3 border-t border-dashed border-purple-500">
            <p className="text-xs font-semibold text-purple-200 mb-1 flex items-center">
              <Lock size={14} className="inline-block mr-1" /> Criptografado:
            </p>
            <p className="font-mono text-xs break-all bg-purple-900/50 p-2 rounded-md">
              {message.encryptedContent}
            </p>
            <p className="mt-2 text-xs text-neutral-300">
              Original:{" "}
              <span className="font-mono">{message.encryptedContent}</span>
            </p>
          </div>
        )}
        {/* Bloco de Mensagem Descriptografada (se você reintroduzir) */}
        {/* {message.type === "decrypted" && message.decryptedContent && (
          <div className="mt-3 pt-3 border-t border-dashed border-green-500">
            <p className="text-xs font-semibold text-green-200 mb-1 flex items-center">
              <Unlock size={14} className="inline-block mr-1" /> Descriptografado:
            </p>
            <p className="font-mono text-xs break-all bg-green-900/50 p-2 rounded-md">{message.decryptedContent}</p>
            <p className="mt-2 text-xs text-neutral-300">
              Input: <span className="font-mono">{message.encryptedContent}</span>
            </p>
          </div>
        )} */}
        <p className="text-right text-xs text-neutral-400 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
