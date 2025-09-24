import { ChatMessage } from "../types";

interface ChatMessageProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export function ChatMessageComponent({
  message,
  isStreaming = false,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 px-4`}
    >
      <div
        className={`max-w-[280px] px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-iris-button text-white rounded-br-md"
            : "bg-transparent border border-iris-border text-white rounded-bl-md"
        }`}
      >
        <p className="text-base leading-relaxed">
          {message.content}
          {isStreaming && <span className="animate-pulse">|</span>}
        </p>
      </div>
    </div>
  );
}
