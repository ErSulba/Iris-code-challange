import type React from "react";

export type ConversationMood =
  | "neutral"
  | "warm"
  | "energetic"
  | "calm"
  | "excited";

interface MoodBackgroundProps {
  mood?: ConversationMood;
  children: React.ReactNode;
  className?: string;
}

export function MoodBackground({
  mood = "neutral",
  children,
  className = "",
}: MoodBackgroundProps) {
  const getMoodClass = (mood: ConversationMood) => {
    switch (mood) {
      case "warm":
        return "bg-mood-warm";
      case "energetic":
        return "bg-mood-energetic";
      case "calm":
        return "bg-mood-calm";
      case "excited":
        return "bg-mood-excited";
      default:
        return "bg-mood-neutral";
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ease-in-out ${getMoodClass(
        mood
      )} ${className}`}
    >
      {children}
    </div>
  );
}
