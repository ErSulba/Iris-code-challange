import { Routes, Route } from "react-router-dom";
import { IrisHomeView } from "./views/home";
import { TextChatView } from "./views/text-chat";
import { VoiceChatView } from "./views/voice-chat";
// import { IrisHomeView } from "@/components/iris/iris-home-view"
// import { TextChatView } from "@/components/iris/text-chat-view"
// import { VoiceChatView } from "@/components/iris/voice-chat-view"

function App() {
  return (
    <div className="font-sans antialiased">
      <Routes>
        <Route path="/" element={<IrisHomeView />} />
        <Route path="/text-chat" element={<TextChatView />} />
        <Route path="/voice-chat" element={<VoiceChatView />} />
      </Routes>
    </div>
  );
}

export default App;
