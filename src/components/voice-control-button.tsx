interface VoiceControlButtonProps {
  isRecording: boolean;
  isEnabled: boolean;
  onToggleRecording: () => void;
  className?: string;
}

// Custom Mic icon component
function MicIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <line x1="8" x2="16" y1="22" y2="22" />
    </svg>
  );
}

export function VoiceControlButton({
  isRecording,
  isEnabled,
  onToggleRecording,
  className = "",
}: VoiceControlButtonProps) {
  return (
    <button
      onClick={onToggleRecording}
      disabled={!isEnabled}
      className={`
        relative w-20 h-20 rounded-full transition-all duration-300 
        focus:outline-none focus:ring-2 focus:ring-iris-teal focus:ring-offset-2 focus:ring-offset-iris-dark
        ${
          isRecording
            ? "bg-iris-teal hover:bg-iris-teal/80 shadow-lg shadow-iris-teal/25"
            : "bg-iris-button hover:bg-iris-button-hover"
        }
        ${!isEnabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      <MicIcon
        className={`w-8 h-8 mx-auto ${
          isRecording ? "text-iris-dark" : "text-iris-teal"
        }`}
      />

      {/* Recording pulse effect */}
      {isRecording && (
        <div className="absolute inset-0 rounded-full bg-iris-teal animate-ping opacity-25"></div>
      )}
    </button>
  );
}
