import { useNavigate } from "react-router-dom";
// import { Header } from "./header"
// import { GlowingOrb } from "./glowing-orb"
// import { ActionButtons } from "./action-buttons"
// import { BottomNavigation } from "./bottom-navigation";
import { Header } from "../components/header";
import { GlowingOrb } from "../components/glowing-orb";
import { ActionButtons } from "../components/action-buttons";
import { BottomNavigation } from "../components/bottom-navigation";

export function IrisHomeView() {
  const navigate = useNavigate();

  const handleNavigateToTextChat = () => {
    navigate("/text-chat");
  };

  const handleNavigateToVoiceChat = () => {
    navigate("/voice-chat");
  };

  return (
    <div className="min-h-screen bg-iris-dark text-white mx-auto relative overflow-hidden flex flex-col">
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <GlowingOrb />

        <p className="text-iris-gray text-center text-base leading-relaxed px-4 mb-12 max-w-xs">
          Chat with Iris. The more you engage, the more you'll build
          self-awareness—and move through life with clarity and confidence.
        </p>

        <ActionButtons
          onTalkClick={handleNavigateToVoiceChat}
          onTextClick={handleNavigateToTextChat}
        />
      </div>

      <BottomNavigation />
    </div>
  );
}
