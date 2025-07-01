import React from "react";
import { ChatMessageBubble } from "./ChatMessageBubble"; 
import type { ChatMessage } from "./types";

interface ChatMessagesProps {
  messages: ChatMessage[];
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  chatContainerRef,
}) => {
  return (
    <div
      ref={chatContainerRef}
      className="flex-1 p-4 overflow-y-auto no-visible-scrollbar bg-neutral-900 shadow-inner rounded-b-lg"
    >
      {messages.map((msg) => (
        <ChatMessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
};
