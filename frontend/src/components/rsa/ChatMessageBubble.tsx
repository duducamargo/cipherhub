import React from "react";
import { Lock } from "lucide-react";
import { motion, type Variants, type Easing } from "framer-motion"; 
import type { ChatMessage } from "./types";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
}) => {
  const animationVariants: Variants = {
    hidden: {
      opacity: 0,
      y: message.sender === "user" ? 20 : 20,
      x: message.sender === "user" ? 20 : -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as Easing,
      },
    },
  };

  return (
    <div
      key={message.id}
      className={`flex mb-4 ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <motion.div
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        className={`max-w-[75%] p-4 rounded-xl shadow-lg border ${
          message.sender === "user"
            ? "bg-purple-700 text-white border-purple-600 rounded-br-none"
            : "bg-neutral-700 text-neutral-200 border-neutral-600 rounded-bl-none"
        } ${
          message.type === "error"
            ? "bg-red-800 text-white border-red-700"
            : message.type === "info"
            ? "bg-blue-800 text-white border-blue-700"
            : ""
        }`}
      >
        <p className="font-bold text-sm mb-1 opacity-90">
          {message.sender === "user" ? "Você" : "Sistema"}
        </p>
        <p className="text-sm break-words whitespace-pre-wrap">
          {message.content}
        </p>

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
              <span className="font-mono">{message.decryptedContent}</span>
            </p>
          </div>
        )}
        <p className="text-right text-xs text-neutral-400 mt-2">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </motion.div>
    </div>
  );
};
