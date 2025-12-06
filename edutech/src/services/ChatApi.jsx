import api from "../Api";

export const ChatApi = async ({ chatId, messages }) => {
  try {
    const res = await api.post("/chat", {
      chat_id: chatId,
      messages,
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
    console.log(error);
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
