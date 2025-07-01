export interface ChatMessage {
  id: string;
  sender: "user" | "system";
  type: "text" | "encrypted" | "decrypted" | "error" | "info"; 
  content: string; // Mensagem principal (texto do usuário, erro, info)
  encryptedContent?: string; // Conteúdo criptografado (se type === 'encrypted')
  decryptedContent?: string; // Conteúdo descriptografado (se type === 'decrypted')
  timestamp: Date;
}

export type ChatMode = "encrypt" | "decrypt";

// Interface para as props do ChatHeader
export interface ChatHeaderProps {
  nKey: string;
  setNKey: (value: string) => void;
  eKey: string;
  setEKey: (value: string) => void;
  handleGenerateKeys: () => Promise<void>;
  currentMode: ChatMode;
}

// Interface para as props do ChatInput
export interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (value: string) => void;
  currentMode: ChatMode;
  setCurrentMode: (mode: ChatMode) => void;
  handleProcessMessage: () => Promise<void>;
}

// Constantes para as chaves estáticas (se for usá-las para descriptografia em algum lugar)
// Lembre-se de substituir pelos seus valores reais
export const STATIC_N = "594144097";
export const STATIC_D = "466640129"; 
