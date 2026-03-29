import { Send, Menu, Copy, Check } from "lucide-react";
import Sidebar from "../chatComponents/Sidebar";
import { useChat } from "../../../hooks/useChat";
import React, { useEffect, useRef, useState } from "react";

// ⭐ 1. CodeBlock Component (Unchanged)
const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden bg-black/50 border border-purple-500/30">
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-purple-500/30">
        <span className="text-xs font-mono text-gray-400 lowercase">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="p-3 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

// ⭐ 2. NEW: TextFormatter to style bold text (**) and inline code (`) for step-by-step instructions
const TextFormatter = ({ text }) => {
  // This regex splits the text by **bold** or `inline code`
  const parts = text.split(/(\*\*[\s\S]*?\*\*|`[^`]+`)/g);

  return (
    <>
      {parts.map((part, i) => {
        // Handle **Bold Text** (often used for step titles)
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Handle `inline code`
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="bg-black/40 border border-purple-500/20 text-purple-200 px-1.5 py-0.5 rounded-md text-sm font-mono"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        // Return standard text
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

// ⭐ 3. ParsedMessage now handles both large code blocks and standard text formatting
const ParsedMessage = ({ content }) => {
  const blocks = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="whitespace-pre-wrap break-words leading-relaxed text-gray-200">
      {blocks.map((block, index) => {
        // Handle large code blocks
        if (block.startsWith("```") && block.endsWith("```")) {
          const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
          const language = match && match[1] ? match[1] : "";
          const code = match && match[2] ? match[2].trim() : block.replace(/```/g, "").trim();

          return <CodeBlock key={index} code={code} language={language} />;
        }
        // Pass standard text to our new TextFormatter
        return <TextFormatter key={index} text={block} />;
      })}
    </div>
  );
};

const ChatPage = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); 

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

      <Sidebar
        activeChatId={activeChatId}
        onSelectChat={(id) => {
          setActiveChatId(id);
          setSidebarOpen(false);
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

      <main className="flex-1 flex flex-col w-full">
        <header className="border-b border-purple-500/20 bg-black/40 backdrop-blur-xl px-4 py-4 flex items-center justify-between">
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

        <div className="flex-1 flex flex-col px-3 md:px-6 pb-6 pt-4 gap-4 overflow-hidden">
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
                  className={`max-w-[85%] md:max-w-2xl px-4 py-3 rounded-2xl text-sm md:text-base ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-white/10 border border-purple-500/30 text-gray-100"
                  }`}
                >
                  {/* ⭐ RENDER PARSED MESSAGE */}
                  {msg.role === "assistant" ? (
                    <ParsedMessage content={msg.content} />
                  ) : (
                    <p className="whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  )}
                </div>
              </div>
            ))}

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