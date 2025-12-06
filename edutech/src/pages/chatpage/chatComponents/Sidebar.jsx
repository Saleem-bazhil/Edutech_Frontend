import React, { useEffect, useState } from "react";
import { Plus, Trash2, ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../../Api";

const Sidebar = ({
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isOpen,
  onClose,
}) => {
  const [chats, setChats] = useState([]);
  const [localActiveId, setLocalActiveId] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentActiveId = activeChatId ?? localActiveId;

  // Fetch history auto refresh
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/chat/history");
        const data = Array.isArray(res.data) ? res.data : [];
        setChats(data);

        if (!currentActiveId && data.length > 0) {
          const firstId = data[0].id;
          setLocalActiveId(firstId);
          onSelectChat && onSelectChat(firstId);
        }
      } catch (err) {
        console.error("Failed to fetch chat history", err);
      }
    };

    fetchHistory();
    const id = setInterval(fetchHistory, 4000);
    return () => clearInterval(id);
  }, []);

  const handleNewChat = async () => {
    try {
      const res = await api.post("/chat/new");
      const chat = res.data;

      setChats((prev) => [chat, ...prev]);
      setLocalActiveId(chat.id);
      onNewChat && onNewChat(chat);
      onSelectChat && onSelectChat(chat.id);

      onClose && onClose(); // close drawer on mobile
    } catch (err) {
      console.error("Failed to create new chat", err);
    }
  };

  const handleSelectChat = (id) => {
    setLocalActiveId(id);
    onSelectChat && onSelectChat(id);
    onClose && onClose(); // close mobile drawer
  };

  const handleDeleteChat = async () => {
    const id = currentActiveId;
    if (!id) return;

    setLoading(true);
    try {
      await api.delete(`/chat/${id}`);

      setChats((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        const nextId = updated[0]?.id ?? null;

        setLocalActiveId(nextId);
        onSelectChat && onSelectChat(nextId);

        return updated;
      });

      onDeleteChat && onDeleteChat(id);
    } catch (err) {
      console.error("Failed to delete chat", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP (Mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-72 bg-black/40 backdrop-blur-xl
        border-r border-purple-500/20 flex flex-col z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static
      `}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden p-4 flex justify-end">
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-6 border-b border-purple-500/20">
          <button
            onClick={handleNewChat}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chats.length === 0 && (
            <p className="text-xs text-gray-400 italic">No chats yet.</p>
          )}

          {chats.map((chat) => {
            const isActive = chat.id === currentActiveId;
            return (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`w-full text-left p-3 rounded-lg transition-all group border ${
                  isActive
                    ? "bg-purple-500/30 border-purple-500/50"
                    : "hover:bg-white/5 border-transparent"
                }`}
              >
                <p className="text-white truncate text-sm font-medium">
                  {chat.title}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(chat.created_at).toLocaleString()}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/20 space-y-2">
          <button
            disabled={!currentActiveId || loading}
            onClick={handleDeleteChat}
            className="w-full py-2 text-red-400 hover:text-red-300 transition-colors flex items-center justify-center gap-2 text-sm hover:bg-red-500/10 rounded disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            {loading ? "Deleting..." : "Delete Chat"}
          </button>

          <Link
            to="/"
            className="block w-full py-2 text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm hover:bg-white/10 rounded"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
