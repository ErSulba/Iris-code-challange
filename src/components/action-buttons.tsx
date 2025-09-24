import type React from "react";

import { MessageCircle } from "lucide-react";
import { AudioWaveIcon } from "./audio-wave-icon";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  "aria-label": string;
}

function ActionButton({
  onClick,
  children,
  "aria-label": ariaLabel,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 bg-iris-button hover:bg-iris-button-hover text-white rounded-full py-4 px-6 flex items-center justify-center gap-3 transition-colors focus:outline-none focus:ring-2 focus:ring-iris-teal focus:ring-offset-2 focus:ring-offset-iris-dark"
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

interface ActionButtonsProps {
  onTalkClick: () => void;
  onTextClick: () => void;
}

export function ActionButtons({
  onTalkClick,
  onTextClick,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-4 w-full px-4">
      <ActionButton onClick={onTalkClick} aria-label="Start voice chat">
        <AudioWaveIcon />
        <span className="text-iris-teal font-medium">Talk</span>
      </ActionButton>

      <ActionButton onClick={onTextClick} aria-label="Start text chat">
        <MessageCircle className="w-5 h-5 text-iris-teal" />
        <span className="text-iris-teal font-medium">Text</span>
      </ActionButton>
    </div>
  );
}
