/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  STATIC_D,
  STATIC_N,
  type ChatMessage,
  type ChatMode,
} from "@/components/rsa/types";
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

const isValidNumericAndPositive = (key: string): boolean => {
  if (!key) return false;
  try {
    return /^\d+$/.test(key) && BigInt(key) > 0n;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return false; 
  }
};

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

      if (
        !isValidNumericAndPositive(data.n) ||
        !isValidNumericAndPositive(data.e) ||
        !isValidNumericAndPositive(data.d)
      ) {
        throw new Error(
          "As chaves geradas pelo backend são inválidas (formato incorreto)."
        );
      }

      setNKey(data.n);
      setEKey(data.e);
      addMessage({
        sender: "system",
        type: "info",
        content: `Chaves geradas:\nN: ${data.n}\nE: ${data.e}\nD: ${data.d}`,
      });
    } catch (error: any) {
      // console.error("Erro ao gerar chaves:", error);
      addMessage({
        sender: "system",
        type: "error",
        content: `Erro ao gerar chaves: ${
          error.message || "Não foi possível conectar ao servidor."
        }`,
      });
    }
  }, [addMessage]);

  const handleProcessMessage = useCallback(async () => {
    const messageToSend = inputMessage.trim();
    if (!messageToSend) return;

    addMessage({ sender: "user", type: "text", content: messageToSend });
    setInputMessage("");

    let usedNKey: string;
    let usedEKey: string;
    let usedDKey: string = "";

    const MIN_N_DIGITS_FOR_FRONTEND = 3; 

    if (!isValidNumericAndPositive(nKey)) {
      addMessage({
        sender: "system",
        type: "error",
        content: "Chave N inválida: N deve ser um número inteiro positivo.",
      });
      return;
    }
    if (nKey.length < MIN_N_DIGITS_FOR_FRONTEND) {
      addMessage({
        sender: "system",
        type: "error",
        content:
          "Chave N inválida: N deve ser um número inteiro positivo muito grande (geralmente com centenas de dígitos e composto pela multiplicação de dois números primos grandes).",
      });
      return;
    }
    const bigIntN = BigInt(nKey);
    if (bigIntN <= 1n) {
      addMessage({
        sender: "system",
        type: "error",
        content:
          "Chave N inválida: N deve ser um número inteiro positivo muito grande (geralmente com centenas de dígitos e composto pela multiplicação de dois números primos grandes).",
      });
      return;
    }

    if (currentMode === "encrypt") {
      usedNKey = nKey;
      usedEKey = eKey;

      if (!isValidNumericAndPositive(usedEKey)) {
        addMessage({
          sender: "system",
          type: "error",
          content: "Chave E inválida: E deve ser um número inteiro positivo.",
        });
        return;
      }
      const bigIntE = BigInt(usedEKey);
      if (bigIntE <= 1n) {
        addMessage({
          sender: "system",
          type: "error",
          content:
            "Chave E inválida: E deve ser um número inteiro positivo, como 3 ou 65537. Geralmente, números pequenos e ímpares são usados para esta chave.",
        });
        return;
      }
    } else {
      // currentMode === "decrypt"
      usedNKey = STATIC_N;
      usedDKey = STATIC_D; 
      usedEKey = "";

      if (!isValidNumericAndPositive(usedDKey)) {
        addMessage({
          sender: "system",
          type: "error",
          content: "Chave D inválida: D deve ser um número inteiro positivo.",
        });
        return;
      }
      const bigIntD = BigInt(usedDKey);
      if (bigIntD <= 1n) {
        addMessage({
          sender: "system",
          type: "error",
          content: "Chave D inválida: D deve ser um número inteiro positivo.",
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
          errorData.error ||
            "Erro ao processar RSA: As chaves fornecidas podem ser inválidas. Certifique-se de que N é um número inteiro positivo muito grande (geralmente com centenas de dígitos e composto pela multiplicação de dois números primos grandes). As chaves E e D também devem ser números inteiros positivos válidos."
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
      // console.error("Erro na comunicação com o backend ou validação:", error);
      addMessage({
        sender: "system",
        type: "error",
        content: `Erro: ${
          error.message ||
          "Não foi possível conectar ao servidor ou houve um erro inesperado."
        }`,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputMessage, nKey, eKey, currentMode, addMessage, STATIC_N, STATIC_D]);

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
