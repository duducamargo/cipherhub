import type { ChatMessage } from "@/components/rsa/types";
import { useState, useRef, useEffect, useCallback } from "react";

interface UseChatMessagesReturn {
  messages: ChatMessage[];
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  chatContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const useChatMessages = (): UseChatMessagesReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Função para adicionar mensagem
  const addMessage = useCallback(
    (message: Omit<ChatMessage, "id" | "timestamp">) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...message, id: Date.now().toString(), timestamp: new Date() },
      ]);
    },
    []
  );

  // Efeito para rolagem automática
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return { messages, addMessage, chatContainerRef };
};
