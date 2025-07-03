/* eslint-disable @typescript-eslint/no-explicit-any */
import { STATIC_D, STATIC_N, type ChatMessage, type ChatMode } from "@/components/rsa/types";
import { useState, useCallback } from "react";


interface UseRsaLogicReturn {
  nKey: string;
  setNKey: (value: string) => void;
  eKey: string;
  setEKey: (value: string) => void;
  inputMessage: string;
  setInputMessage: (value: string) => void;
  currentMode: ChatMode;
  setCurrentMode: (mode: ChatMode) => void;
  handleGenerateKeys: () => Promise<void>;
  handleProcessMessage: () => Promise<void>;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void; 
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export const useRsaLogic = (
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void
): UseRsaLogicReturn => {
  const [nKey, setNKey] = useState("");
  const [eKey, setEKey] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [currentMode, setCurrentMode] = useState<ChatMode>("encrypt");

  const handleGenerateKeys = useCallback(async () => {
    addMessage({
      sender: "user",
      type: "info",
      content: "Gerando novas chaves RSA...",
    });
    try {
      const response = await fetch(`${API_BASE}/rsa/generate-keys`, {
        method: "POST",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao gerar chaves no backend.");
      }
      const data = await response.json();
      setNKey(data.n);
      setEKey(data.e);
      addMessage({
        sender: "system",
        type: "info",
        content: `Chaves geradas:\nN: ${data.n}\nE: ${data.e}\nD: ${data.d}`,
      });
    } catch (error: any) {
      console.error("Erro ao gerar chaves:", error);
      addMessage({
        sender: "system",
        type: "error",
        content: `Erro ao gerar chaves: ${
          error.message || "Não foi possível conectar ao servidor."
        }`,
      });
    }
  }, [addMessage]); // Dependência em addMessage

  const handleProcessMessage = useCallback(async () => {
    const messageToSend = inputMessage.trim();
    if (!messageToSend) return;

    addMessage({ sender: "user", type: "text", content: messageToSend });
    setInputMessage("");

    let usedNKey: string;
    let usedEKey: string;
    let usedDKey: string = "";

    if (currentMode === "encrypt") {
      usedNKey = nKey;
      usedEKey = eKey;

      if (!usedNKey || !usedEKey) {
        addMessage({
          sender: "system",
          type: "error",
          content: "Erro: N e E são necessários para criptografar.",
        });
        return;
      }
    } else {
      // currentMode === "decrypt"
      usedNKey = STATIC_N;
      usedDKey = STATIC_D;
      usedEKey = ""; 

      if (!usedNKey || !usedDKey) {
        addMessage({
          sender: "system",
          type: "error",
          content:
            "Erro interno: Chaves estáticas de descriptografia não definidas.",
        });
        return;
      }
    }

    try {
      const response = await fetch(`${API_BASE}/rsa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: messageToSend,
          n: usedNKey,
          e: usedEKey,
          d: usedDKey,
          mode: currentMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erro desconhecido ao processar no backend."
        );
      }

      const data = await response.json();

      if (currentMode === "encrypt") {
        if (data.encrypt) {
          addMessage({
            sender: "system",
            type: "encrypted",
            content: "Mensagem criptografada:",
            encryptedContent: `[${data.encrypt.join(", ")}]`,
            decryptedContent: messageToSend,
          });
        } else {
          addMessage({
            sender: "system",
            type: "error",
            content: "Erro: Resposta de criptografia inválida.",
          });
        }
      } else {
        // currentMode === "decrypt"
        if (data.decrypt) {
          addMessage({
            sender: "system",
            type: "decrypted",
            content: "Mensagem descriptografada:",
            decryptedContent: data.decrypt,
            encryptedContent: messageToSend,
          });
        } else {
          addMessage({
            sender: "system",
            type: "error",
            content: "Erro: Resposta de descriptografia inválida.",
          });
        }
      }
    } catch (error: any) {
      console.error("Erro na comunicação com o backend:", error);
      addMessage({
        sender: "system",
        type: "error",
        content: `Erro: ${
          error.message || "Não foi possível conectar ao servidor."
        }`,
      });
    }
  }, [inputMessage, nKey, eKey, currentMode, addMessage]); 

  return {
    nKey,
    setNKey,
    eKey,
    setEKey,
    inputMessage,
    setInputMessage,
    currentMode,
    setCurrentMode,
    handleGenerateKeys,
    handleProcessMessage,
    addMessage, 
  };
};
