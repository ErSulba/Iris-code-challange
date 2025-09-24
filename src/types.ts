export type ConversationMood = "neutral" | "warm" | "energetic" | "calm" | "excited"
export interface ChatMessage {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  mood?: "positive" | "neutral" | "negative" | "curious" | "supportive"
  isStreaming?: boolean
}

export interface ChatState {
  messages: ChatMessage[]
  isTyping: boolean
  error: string | null
}

export interface StreamingConfig {
  chunkSize: number
  delayMs: number
}

export type NavigationSection = "insights" | "chat" | "iris" | "explore"

export type ChatMode = "text" | "voice"
