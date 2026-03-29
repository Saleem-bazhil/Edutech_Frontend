import api from "../Api";

export const ChatApi = async ({ chatId, messages, provider }) => {
  try {
    console.log("POST /chat provider:", provider);
    const res = await api.post("/chat", {
      chat_id: chatId,
      messages,
      provider,
    });

    const data = res.data;

    // ChatResponse
    if (typeof data.content === "string") {
      return data.content;
    }

    if (typeof data.content === "object" && data.content?.content) {
      return data.content.content;
    }

    if (Array.isArray(data.content)) {
      return data.content.join(" ");
    }

    return JSON.stringify(data.content);
  } catch (error) {
    console.log("Chat API error:", error);
    const backendDetail = error?.response?.data?.detail;
    if (typeof backendDetail === "string" && backendDetail.trim()) {
      return `Error: ${backendDetail}`;
    }
    return "Error: Unable to reach AI";
  }
};

export const fetchChatMessages = async (chatId) => {
  const res = await api.get(`/chat/${chatId}/messages`);
  // backend returns 
  return res.data.map((m) => ({
    role: m.role,
    content: m.content,
  }));
};
