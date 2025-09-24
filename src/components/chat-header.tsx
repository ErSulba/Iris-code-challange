import { AudioWaveIcon } from "./audio-wave-icon";

interface ChatHeaderProps {
  mode: "text" | "voice";
  onModeChange: (mode: "text" | "voice") => void;
  onEnd: () => void;
  assistantName?: string;
}

function MessageCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

export function ChatHeader({
  mode,
  onModeChange,
  onEnd,
  assistantName = "Sam",
}: ChatHeaderProps) {
  return (
    <div className="bg-iris-dark">
      {/* Mode Toggle and End Button */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="bg-gray-800/50 rounded-full p-1 flex">
          <button
            onClick={() => onModeChange("voice")}
            className={`px-4 py-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-iris-teal focus:ring-offset-2 focus:ring-offset-iris-dark ${
              mode === "voice"
                ? "bg-gray-700 text-iris-teal shadow-sm"
                : "text-gray-400 hover:text-gray-300"
            }`}
            aria-label="Switch to voice mode"
          >
            <AudioWaveIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => onModeChange("text")}
            className={`px-4 py-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-iris-teal focus:ring-offset-2 focus:ring-offset-iris-dark ${
              mode === "text"
                ? "bg-gray-700 text-iris-teal shadow-sm"
                : "text-gray-400 hover:text-gray-300"
            }`}
            aria-label="Switch to text mode"
          >
            <MessageCircleIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="text-iris-teal text-4xl font-bold">S</div>

        <button
          onClick={onEnd}
          className="bg-iris-teal hover:bg-iris-teal/80 text-iris-dark px-6 py-2 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-iris-teal focus:ring-offset-2 focus:ring-offset-iris-dark"
          aria-label="End chat session"
        >
          End
        </button>
      </div>

      {/* Assistant Name */}
      <div className="text-center pb-4 border-b border-iris-border">
        <h2 className="text-white text-lg font-medium">
          Chatting with {assistantName}
        </h2>
      </div>
    </div>
  );
}
