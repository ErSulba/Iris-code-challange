import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChatMode, ConversationMood } from "../types";
import { ChatHeader } from "../components/chat-header";
import { MoodBackground } from "../components/mood-background";
import { VoiceOrb } from "../components/voice-orb";
import { VoiceControlButton } from "../components/voice-control-button";

export function VoiceChatView() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);

  const [aiMood, setAiMood] = useState<ConversationMood>("excited"); // Start with pink-purple
  const aiMoodCycle: ConversationMood[] = ["excited", "warm"]; // Pink-purple and orange
  const moodIndexRef = useRef(0);

  useEffect(() => {
    if (!isRecording && isUserSpeaking) {
      const timeout = setTimeout(() => {
        setIsUserSpeaking(false);
        setIsAISpeaking(true);

        moodIndexRef.current = (moodIndexRef.current + 1) % aiMoodCycle.length;
        setAiMood(aiMoodCycle[moodIndexRef.current]);

        const aiSpeakingTimeout = setTimeout(() => {
          setIsAISpeaking(false);
        }, 3000);

        return () => clearTimeout(aiSpeakingTimeout);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isRecording, isUserSpeaking]);

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleModeChange = (mode: ChatMode) => {
    if (mode === "text") {
      navigate("/text-chat");
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setIsUserSpeaking(true);
    } else {
      setIsRecording(true);
      setIsUserSpeaking(false);
      setIsAISpeaking(false);
    }
  };

  return (
    <MoodBackground mood={aiMood}>
      <div className="min-h-screen text-white flex flex-col">
        <ChatHeader
          mode="voice"
          onModeChange={handleModeChange}
          onEnd={handleNavigateHome}
          assistantName="Sam"
        />

        <div className="text-center py-2 text-xs text-white/60">
          AI mood: {aiMood} | User:{" "}
          {isUserSpeaking || isRecording ? "active" : "inactive"}
        </div>

        {/* Voice Visualization Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 space-y-14">
          <VoiceOrb
            type="ai"
            isActive={isAISpeaking}
            isSpeaking={isAISpeaking}
            mood={aiMood}
            className="mb-8"
          />

          <VoiceOrb
            type="user"
            isActive={isRecording || isUserSpeaking}
            isSpeaking={isUserSpeaking}
            mood="calm"
            className="mb-16"
          />
        </div>

        {/* Voice Control */}
        <div className="flex justify-center pb-8">
          <VoiceControlButton
            isRecording={isRecording}
            isEnabled={!isAISpeaking}
            onToggleRecording={handleToggleRecording}
          />
        </div>
      </div>
    </MoodBackground>
  );
}
