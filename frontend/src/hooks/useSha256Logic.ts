import { useState, useCallback } from "react";
import axios from "axios";

interface UseSha256LogicReturn {
  input: string;
  setInput: (value: string) => void;
  output: string;
  handleProcess: () => Promise<void>;
}

const API_BASE = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:3001";

export const useSha256Logic = (): UseSha256LogicReturn => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleProcess = useCallback(async () => {
    if (!input.trim()) {
      setOutput("Por favor, digite o texto de entrada.");
      return;
    }
    setOutput("Processando..."); 

    try {
      const response = await axios.post(`${API_BASE}/sha256`, {
        text: input,
      });

      console.log("Resposta da API SHA-256:", response.data.result);
      setOutput(response.data.result);
    } catch (error) {
      console.error("Erro ao processar SHA-256:", error);
      setOutput("Erro ao se comunicar com a API SHA-256.");
    }
  }, [input]); 

  return {
    input,
    setInput,
    output,
    handleProcess,
  };
};
