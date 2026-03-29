import { Send, Menu, Copy, Check } from "lucide-react";
import Sidebar from "../chatComponents/Sidebar";
import { useChat } from "../../../hooks/useChat";
import React, { useEffect, useRef, useState } from "react";

const MODEL_OPTIONS = [
  { value: "gemini", label: "Gemini" },
  { value: "grok", label: "Grok" },
];
const DEFAULT_PROVIDER = "grok";
const VALID_PROVIDERS = new Set(MODEL_OPTIONS.map((option) => option.value));

// ⭐ 1. CodeBlock Component
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

// ⭐ 2. TextFormatter for bold text and inline code
const TextFormatter = ({ text }) => {
  const parts = text.split(/(\*\*[\s\S]*?\*\*|`[^`]+`)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
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
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

// ⭐ 3. ParsedMessage
const ParsedMessage = ({ content }) => {
  const blocks = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="whitespace-pre-wrap break-words leading-relaxed text-gray-200 text-left">
      {blocks.map((block, index) => {
        if (block.startsWith("```") && block.endsWith("```")) {
          const match = block.match(/```(\w+)?\n([\s\S]*?)```/);
          const language = match && match[1] ? match[1] : "";
          const code = match && match[2] ? match[2].trim() : block.replace(/```/g, "").trim();

          return <CodeBlock key={index} code={code} language={language} />;
        }
        return <TextFormatter key={index} text={block} />;
      })}
    </div>
  );
};

// ⭐ 4. NEW: UserMessage Component
// Handles raw code pastes gracefully by wrapping them in a scrollable container
const UserMessage = ({ content }) => {
  return (
    <div className="max-w-full overflow-x-auto">
      <div className="whitespace-pre-wrap break-words leading-relaxed text-left">
        {content}
      </div>
    </div>
  );
};

const ChatPage = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [provider, setProvider] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_PROVIDER;

    const storedProvider = localStorage.getItem("chat-provider");
    return VALID_PROVIDERS.has(storedProvider)
      ? storedProvider
      : DEFAULT_PROVIDER;
  });

  const { messages, input, loading, handleChange, handleKeyDown, sendMessage } =
    useChat(activeChatId, provider);

  const messagesRef = useRef(null);
  const textareaRef = useRef(null);
  const providerRef = useRef(provider);

  useEffect(() => {
    providerRef.current = provider;
  }, [provider]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat-provider", provider);
    }
  }, [provider]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      180
    )}px`;
  }, [input]);

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

      <main className="flex-1 flex flex-col w-full min-w-0 h-screen">
        <header className="border-b border-purple-500/20 bg-black/40 backdrop-blur-xl px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
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
          </div>

          <label className="flex items-center gap-2 rounded-xl border border-purple-500/30 bg-white/10 px-3 py-2 text-sm text-gray-200">
            <span className="hidden sm:inline text-gray-300">Model</span>
            <select
              value={provider}
              onChange={(e) => {
                const nextProvider = e.target.value;
                const resolvedProvider = VALID_PROVIDERS.has(nextProvider)
                  ? nextProvider
                  : DEFAULT_PROVIDER;
                console.log("UI selected provider:", resolvedProvider);
                providerRef.current = resolvedProvider;
                setProvider(resolvedProvider);
              }}
              className="bg-transparent text-white outline-none"
            >
              {MODEL_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-slate-900 text-white"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </header>

        <div className="flex-1 min-h-0 flex flex-col px-3 md:px-6 pb-4 pt-4 gap-4 overflow-hidden">
          <section
            ref={messagesRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 space-y-5 flex flex-col rounded-2xl bg-black/30 backdrop-blur-xl border border-purple-500/30"
          >
            {messages.length === 0 && !loading && (
              <div className="flex items-center justify-center h-full text-gray-400">
                Ask something to start the conversation…
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex w-full ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative w-fit max-w-[92%] md:max-w-3xl px-5 py-3.5 rounded-2xl text-sm md:text-base text-left shadow-lg overflow-hidden ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-sm"
                      : "bg-white/10 border border-purple-500/30 text-gray-100 rounded-bl-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <ParsedMessage content={msg.content} />
                  ) : (
                    // ⭐ FIX: Pass user input to the new UserMessage component
                    <UserMessage content={msg.content} />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-purple-500/30 px-5 py-4 rounded-2xl rounded-bl-sm">
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

          <footer className="shrink-0 rounded-2xl border border-purple-500/30 bg-black/45 backdrop-blur-xl p-3 md:p-4">
            <div className="flex items-end gap-2 md:gap-3">
              <textarea
                ref={textareaRef}
                placeholder="Ask me anything..."
                className="max-h-[180px] min-h-[52px] flex-1 resize-none overflow-y-auto rounded-2xl border border-purple-500/30 bg-white/5 px-4 md:px-6 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                value={input}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(providerRef.current);
                  } else {
                    handleKeyDown(e);
                  }
                }}
                rows={1}
              />

              <button
                onClick={() => sendMessage(providerRef.current)}
                disabled={loading || !activeChatId}
                className="flex h-[52px] flex-shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 md:px-6 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
                title={!activeChatId ? "Create or select a chat first" : `Send with ${provider}`}
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
