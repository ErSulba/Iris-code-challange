import { useEffect, useState } from "react";
import type { ConversationMood } from "./mood-background";

interface VoiceOrbProps {
  type: "ai" | "user";
  isActive?: boolean;
  isSpeaking?: boolean;
  mood?: ConversationMood; // Accept mood as prop instead of using hook
  className?: string;
}

const getOrbFrameStyles = (
  mood: ConversationMood,
  frame: number,
  type: "ai" | "user"
) => {
  // Frame 0: idle (small), Frame 1-3: progressively larger and more diffused
  const baseSize = type === "ai" ? 96 : 80; // 24 and 20 in Tailwind units
  const sizes = [
    baseSize * 0.7, // Frame 0: small
    baseSize * 0.9, // Frame 1: medium
    baseSize * 1.1, // Frame 2: large
    baseSize * 1.3, // Frame 3: very large
  ];

  const blurValues = [0, 8, 16, 24]; // Progressive blur
  const opacities = [1, 0.9, 0.8, 0.7]; // Progressive fade

  const size = sizes[frame];
  const blur = blurValues[frame];
  const opacity = opacities[frame];

  const colorPalettes: Record<
    ConversationMood,
    {
      primary: string;
      secondary: string;
      tertiary: string;
      glow: string;
    }
  > = {
    calm: {
      primary: "#fbbf24", // Yellow for user
      secondary: "#f59e0b",
      tertiary: "#d97706",
      glow: "251, 191, 36",
    },
    excited: {
      primary: "#e879f9", // Pink-purple for AI
      secondary: "#c026d3",
      tertiary: "#7c3aed",
      glow: "232, 121, 249",
    },
    warm: {
      primary: "#f97316", // Orange for AI
      secondary: "#ea580c",
      tertiary: "#c2410c",
      glow: "249, 115, 22",
    },
    neutral: {
      primary: "#6b7280", // Gray for neutral
      secondary: "#4b5563",
      tertiary: "#374151",
      glow: "107, 114, 128",
    },
    energetic: {
      primary: "",
      secondary: "",
      tertiary: "",
      glow: "",
    },
  };

  const palette = colorPalettes[mood] || colorPalettes.calm;

  const finalPalette = type === "user" ? colorPalettes.calm : palette;

  return {
    width: size,
    height: size,
    background: `radial-gradient(circle, ${finalPalette.primary}, ${finalPalette.secondary}, ${finalPalette.tertiary})`,
    filter: `blur(${blur}px)`,
    opacity,
    boxShadow: `0 0 ${size * 0.5}px rgba(${finalPalette.glow}, ${
      opacity * 0.6
    })`,
    transition:
      "all 300ms ease-in-out, background 1000ms ease-in-out, box-shadow 1000ms ease-in-out",
  };
};

export function VoiceOrb({
  type,
  isActive = false,
  isSpeaking = false,
  mood = "calm", // Default to calm mood
  className = "",
}: VoiceOrbProps) {
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    if (!isSpeaking && !isActive) {
      setAnimationFrame(0);
      return;
    }

    if (isActive && !isSpeaking) {
      setAnimationFrame(1);
      return;
    }

    if (isSpeaking) {
      const interval = setInterval(() => {
        setAnimationFrame((prev) => {
          const nextFrame = prev + 1;
          return nextFrame > 3 ? 1 : nextFrame;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isSpeaking, isActive]);

  return (
    <div
      className={`relative flex items-center justify-center mb-12 ${className}`}
    >
      {/* Background glow layers */}
      <div
        className="absolute rounded-full"
        style={getOrbFrameStyles(mood, Math.min(animationFrame + 1, 3), type)}
      />
      <div
        className="absolute rounded-full"
        style={getOrbFrameStyles(mood, Math.min(animationFrame + 2, 3), type)}
      />

      {/* Main orb */}
      <div
        className="relative rounded-full shadow-2xl"
        style={getOrbFrameStyles(mood, animationFrame, type)}
      >
        {/* Inner highlight */}
        <div
          className="absolute top-2 left-2 w-4 h-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent)",
            filter: "blur(2px)",
          }}
        />
      </div>
    </div>
  );
}
