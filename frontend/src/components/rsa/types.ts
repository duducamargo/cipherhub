export interface ChatMessage {
  id: string;
  sender: "user" | "system";
  type: "text" | "encrypted" | "decrypted" | "error" | "info"; 
  content: string; 
  encryptedContent?: string; // Conteúdo criptografado (se type === 'encrypted')
  decryptedContent?: string; // Conteúdo descriptografado (se type === 'decrypted')
  timestamp: Date;
}

export type ChatMode = "encrypt" | "decrypt";

export interface ChatHeaderProps {
  nKey: string;
  setNKey: (value: string) => void;
  eKey: string;
  setEKey: (value: string) => void;
  handleGenerateKeys: () => Promise<void>;
  currentMode: ChatMode;
}

export interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  currentMode: ChatMode;
  setCurrentMode: (mode: ChatMode) => void;
  handleProcessMessage: () => Promise<void>;
}

export const STATIC_N = "594144097";
export const STATIC_D = "466640129"; 
