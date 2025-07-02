import React from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import type { ChatMessage, ChatMode } from "./types";


interface RsaChatContainerProps {
  nKey: string;
  setNKey: (value: string) => void;
  eKey: string;
  setEKey: (value: string) => void;
  handleGenerateKeys: () => Promise<void>;
  currentMode: ChatMode; 

  messages: ChatMessage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chatContainerRef: any;

  inputMessage: string;
  setInputMessage: (value: string) => void;
  setCurrentMode: (mode: ChatMode) => void;
  handleProcessMessage: () => Promise<void>;
}

export const RsaChatContainer: React.FC<RsaChatContainerProps> = ({
  nKey,
  setNKey,
  eKey,
  setEKey,
  handleGenerateKeys,
  currentMode,
  messages,
  chatContainerRef,
  inputMessage,
  setInputMessage,
  setCurrentMode,
  handleProcessMessage,
}) => {
  return (
    <div className="w-full max-w-4xl mb-8 bg-neutral-900 rounded-lg shadow-xl overflow-hidden flex flex-col h-[80vh] border border-neutral-700">
      <ChatHeader
        nKey={nKey}
        setNKey={setNKey}
        eKey={eKey}
        setEKey={setEKey}
        handleGenerateKeys={handleGenerateKeys}
        currentMode={currentMode} 
      />
      <ChatMessages messages={messages} chatContainerRef={chatContainerRef} />
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        handleProcessMessage={handleProcessMessage}
      />
    </div>
  );
};
