import { useEffect, useState } from "react";
import { useConversationMood } from "../hooks/use-conversation-hook";

export function GlowingOrb() {
  const [isAnimating, setIsAnimating] = useState(true);
  const { currentMoodColors } = useConversationMood();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-16">
      {/* Outer glow layers */}
      <div
        className={`absolute inset-0 w-32 h-32 -translate-x-6 -translate-y-6 ${
          isAnimating ? "opacity-80" : "opacity-60"
        }`}
        style={{
          transition: "all 1000ms ease-in-out", // Added smooth transitions
        }}
      >
        <div
          className="w-full h-full rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, ${currentMoodColors.primary}40, ${currentMoodColors.primary}20, transparent)`,
            transition: "background 1000ms ease-in-out", // Added background transition
          }}
        ></div>
      </div>

      <div
        className={`absolute inset-0 w-24 h-24 -translate-x-2 -translate-y-2 ${
          isAnimating ? "opacity-90" : "opacity-70"
        }`}
        style={{
          transition: "all 1000ms ease-in-out", // Added smooth transitions
        }}
      >
        <div
          className="w-full h-full rounded-full blur-lg"
          style={{
            background: `radial-gradient(circle, ${currentMoodColors.primary}60, ${currentMoodColors.primary}30, transparent)`,
            transition: "background 1000ms ease-in-out", // Added background transition
          }}
        ></div>
      </div>

      {/* Core orb */}
      <div
        className={`relative w-20 h-20 ${
          isAnimating ? "scale-105" : "scale-100"
        }`}
        style={{
          transition: "all 1000ms ease-in-out", // Added smooth transitions
        }}
      >
        <div
          className="w-full h-full rounded-full shadow-2xl"
          style={{
            background: `radial-gradient(circle, ${currentMoodColors.primary}, ${currentMoodColors.secondary}, ${currentMoodColors.tertiary})`,
            transition: "background 1000ms ease-in-out", // Added background transition
          }}
        ></div>

        {/* Inner highlight */}
        <div className="absolute top-2 left-2 w-6 h-6 bg-gradient-radial from-white/40 to-transparent rounded-full blur-sm"></div>
      </div>
    </div>
  );
}
