import "./App.css";
import HeroSection from "./pages/heropage/mainpage/HeroSection";
import ChatPage from "./pages/chatpage/chatmain/ChatPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
        <div className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]" />

          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
