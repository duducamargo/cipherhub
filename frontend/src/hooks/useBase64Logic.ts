import { useState, useCallback } from "react";
import axios from "axios";


type Base64Mode = "encode" | "decode";

interface UseBase64LogicReturn {
  input: string;
  setInput: (value: string) => void;
  output: string;
  mode: Base64Mode;
  setMode: (mode: Base64Mode) => void;
  handleProcess: () => Promise<void>;
}

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

export const useBase64Logic = (): UseBase64LogicReturn => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Base64Mode>("encode");

  const handleProcess = useCallback(async () => {
    if (!input.trim()) {
      setOutput("Por favor, digite o texto de entrada.");
      return;
    }
    setOutput("Processando...");

    let endpoint = "";
    if (mode === "encode") {
      endpoint = `${API_BASE}/base64/encode`;
    } else if (mode === "decode") {
      endpoint = `${API_BASE}/base64/decode`;
    } else {
      setOutput("Modo inválido. Selecione codificar ou decodificar.");
      return;
    }

    try {
      const response = await axios.post(endpoint, {
        text: input,
      });

      // console.log(`Resposta da API Base64 (${mode}):`, response.data.result);
      setOutput(response.data.result);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error(`Erro ao processar Base64 (${mode}):`, error);
      setOutput(`Erro ao se comunicar com a API Base64.`);
    }
  }, [input, mode]); 

  return {
    input,
    setInput,
    output,
    mode,
    setMode,
    handleProcess,
  };
};
