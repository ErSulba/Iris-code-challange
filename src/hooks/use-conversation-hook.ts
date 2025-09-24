

import { useState, useEffect } from "react"
import { ConversationMood } from "../types"

// Mock conversation topics and their associated moods
const mockConversationMoods: Record<string, ConversationMood> = {
  career: "energetic",
  work: "energetic",
  job: "energetic",
  vacation: "warm",
  travel: "warm",
  holiday: "warm",
  meditation: "calm",
  relax: "calm",
  peace: "calm",
  party: "excited",
  celebration: "excited",
  birthday: "excited",
  achievement: "excited",
  success: "excited",
  project: "energetic",
  exciting: "excited",
}

export const moodColors = {
  neutral: {
    primary: "#71717a",
    secondary: "#52525b",
    tertiary: "#3f3f46",
  },
  warm: {
    primary: "#f97316", // Bright orange
    secondary: "#ea580c", // Medium orange
    tertiary: "#c2410c", // Dark orange
  },
  energetic: {
    primary: "#fb923c", // Very bright orange
    secondary: "#f97316", // Bright orange
    tertiary: "#ea580c", // Medium orange
  },
  excited: {
    primary: "#e879f9", // Bright pink
    secondary: "#c026d3", // Purple-pink
    tertiary: "#7c3aed", // Deep purple
  },
  calm: {
    primary: "#fbbf24", // Bright yellow
    secondary: "#eab308", // Golden yellow
    tertiary: "#a16207", // Dark yellow
  },
} as const

export function useConversationMood() {
  const [mood, setMood] = useState<ConversationMood>("warm") // Start with warm instead of neutral
  const [conversationContext, setConversationContext] = useState<string[]>([])

  // Mock function to analyze conversation and determine mood
  const analyzeMood = (context: string[]) => {
    const recentContext = context.slice(-5).join(" ").toLowerCase()

    console.log("[v0] Analyzing context:", recentContext)

    for (const [keyword, associatedMood] of Object.entries(mockConversationMoods)) {
      if (recentContext.includes(keyword)) {
        console.log("[v0] Found keyword:", keyword, "-> mood:", associatedMood)
        return associatedMood
      }
    }

    return "warm" // Default to warm for active conversations
  }

  useEffect(() => {
    // Start with a career-focused conversation to trigger energetic mood
    setConversationContext(["Let's talk about your career goals and opportunities"])
  }, [])

  // Update mood based on conversation context
  useEffect(() => {
    if (conversationContext.length > 0) {
      const newMood = analyzeMood(conversationContext)
      console.log("[v0] Setting mood to:", newMood)
      setMood(newMood)
    }
  }, [conversationContext])

  const updateConversationContext = (message: string) => {
    console.log("[v0] Adding context:", message)
    setConversationContext((prev) => [...prev, message])
  }

  return {
    mood,
    conversationContext,
    updateConversationContext,
    setMood, // Allow manual mood override
    currentMoodColors: moodColors[mood],
  }
}
