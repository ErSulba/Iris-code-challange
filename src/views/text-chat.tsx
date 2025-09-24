import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChatMessage, ChatState } from "../types";
import { ChatHeader } from "../components/chat-header";
import { ChatMessageComponent } from "../components/chat-message";
import { TypingIndicator } from "../components/typing-indicator";
import { MessageInput } from "../components/message-input";

export function TextChatView() {
  const navigate = useNavigate();
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: "1",
        content: "Hi, what would you like to chat about today?",
        role: "assistant",
        timestamp: new Date(),
        mood: "supportive",
      },
    ],
    isTyping: false,
    error: null,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleModeChange = (mode: "text" | "voice") => {
    if (mode === "voice") {
      navigate("/voice-chat");
    }
    // If mode is "text", we're already on the text chat page
  };

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
      error: null,
    }));

    // Simulate AI response with streaming
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "That's a great question about your career! I'd love to help you explore that. What specific aspects of your career are you thinking about?",
        role: "assistant",
        timestamp: new Date(),
        mood: "supportive",
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isTyping: false,
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-iris-dark text-white mx-auto relative overflow-hidden flex flex-col">
      <ChatHeader
        mode="text"
        onModeChange={handleModeChange}
        onEnd={handleNavigateHome}
        assistantName="Sam"
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto py-6">
        {chatState.messages.map((message) => (
          <ChatMessageComponent key={message.id} message={message} />
        ))}

        {chatState.isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={chatState.isTyping}
      />
    </div>
  );
}
