import { Send, Menu } from "lucide-react";
import Sidebar from "../chatComponents/Sidebar";
import { useChat } from "../../../hooks/useChat";
import React, { useEffect, useRef, useState } from "react";

const ChatPage = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ⭐ MOBILE SIDEBAR

  const { messages, input, loading, handleChange, handleKeyDown, sendMessage } =
    useChat(activeChatId);

  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex overflow-hidden relative">

      {/* ⭐ SIDEBAR (mobile drawer + desktop fixed) */}
      <Sidebar
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          setActiveChatId(id);
          setSidebarOpen(false); // close drawer on mobile
        }}
        onNewChat={(chat) => {
          setActiveChatId(chat.id);
          setSidebarOpen(false);
        }}
        onDeleteChat={(deletedId) => {
          if (activeChatId === deletedId) setActiveChatId(null);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ⭐ MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col w-full">
        {/* HEADER */}
        <header className="border-b border-purple-500/20 bg-black/40 backdrop-blur-xl px-4 py-4 flex items-center justify-between">
          
          {/* ⭐ MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <input
            type="text"
            defaultValue="Exam schedule doubt..."
            className="text-white font-semibold bg-transparent text-lg hover:bg-white/5 px-2 py-1 rounded transition-colors flex-1 max-w-full outline-none focus:bg-white/10 ml-3 md:ml-0"
          />
        </header>

        {/* ⭐ MESSAGE + INPUT SECTION */}
        <div className="flex-1 flex flex-col px-3 md:px-6 pb-6 pt-4 gap-4 overflow-hidden">

          {/* MESSAGE AREA */}
          <section
            ref={messagesRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col rounded-2xl bg-black/30 backdrop-blur-xl border border-purple-500/30"
          >
            {messages.length === 0 && !loading && (
              <div className="flex items-center justify-center h-full text-gray-400">
                Ask something to start the conversation…
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-2xl px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-white/10 border border-purple-500/30 text-gray-100"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <pre className="whitespace-pre-wrap break-words">
                      {msg.content}
                    </pre>
                  ) : (
                    <p className="whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* LOADING INDICATOR */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-purple-500/30 px-4 py-3 rounded-2xl">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full animate-bounce bg-purple-400" />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-purple-400"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full animate-bounce bg-purple-400"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ⭐ INPUT BAR */}
          <footer className="border-t border-purple-500/20 bg-black/40 backdrop-blur-xl p-3 md:p-4 rounded-2xl">
            <div className="flex gap-2 md:gap-3 items-center">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-purple-500/30 rounded-2xl px-4 md:px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />

              <button
                onClick={sendMessage}
                disabled={loading || !activeChatId}
                className="px-4 md:px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white font-semibold hover:scale-105 
                  transition-transform flex items-center gap-2 flex-shrink-0 disabled:opacity-60 disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">
                  {loading ? "Thinking..." : "Send"}
                </span>
              </button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
