import { useState, useEffect, useRef } from "react";
import { ChatApi, fetchChatMessages } from "../services/ChatApi";

export const useChat = (activeChatId, provider = "grok") => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const providerRef = useRef(provider);

  useEffect(() => {
    providerRef.current = provider;
  }, [provider]);

  useEffect(() => {
    const load = async () => {
      if (!activeChatId) {
        setMessages([]);
        return;
      }
      try {
        const history = await fetchChatMessages(activeChatId);
        setMessages(history);
      } catch (e) {
        console.error("Failed to load chat messages", e);
        setMessages([]);
      }
    };

    load();
  }, [activeChatId]);

  const handleChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async (providerOverride) => {
    const text = input.trim();
    if (!text || loading) return;
    if (!activeChatId) {
      console.warn("No activeChatId – click New Chat first");
      return;
    }

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];

    // optimistic update
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const selectedProvider = providerOverride || providerRef.current;
      console.log("Sending message with provider:", selectedProvider);
      const replyText = await ChatApi({
        chatId: activeChatId,
        messages: newMessages,
        provider: selectedProvider,
      });

      const botMsg = { role: "assistant", content: replyText };
      setMessages([...newMessages, botMsg]);
      // backend stores full updated list in _messages_by_chat[chatId]
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    loading,
    handleChange,
    handleKeyDown,
    sendMessage,
  };
};
