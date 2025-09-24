import { useEffect, useState } from "react";

interface AudioWaveIconProps {
  className?: string;
}

export function AudioWaveIcon({ className }: AudioWaveIconProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const getBarHeight = (index: number) => {
    const heights = [
      [16, 12, 20, 8],
      [12, 20, 16, 12],
      [20, 16, 12, 16],
      [16, 8, 16, 20],
    ];
    return heights[animationPhase][index];
  };

  return (
    <div className={`flex gap-1 items-end ${className || ""}`}>
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className="w-1 bg-current rounded-full transition-all duration-200"
          style={{ height: `${getBarHeight(index)}px` }}
        />
      ))}
    </div>
  );
}
