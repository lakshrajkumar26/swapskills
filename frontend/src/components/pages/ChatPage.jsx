import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import API from "../../api/axios";
import { jwtDecode } from "jwt-decode";
import { FaVideo } from "react-icons/fa";
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  // ✅ Connect socket
  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      auth: { token },
    });
    setSocket(newSocket);

    newSocket.on("receiveMessage", (msg) => {
      if (msg.chat === currentChat?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => newSocket.disconnect();
  }, [token, currentChat]);

  // ✅ Fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await API.get("/api/chat/chats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChats(res.data.chats || []);
      } catch (err) {
        console.error("Failed to fetch chats", err);
      }
    };
    fetchChats();
  }, [token]);

  // ✅ Fetch messages of a chat
  const fetchMessages = async (chatId) => {
    try {
      const res = await API.get(`/api/message/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data || []);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  // ✅ When selecting a chat
  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
    fetchMessages(chat._id);

    socket?.emit("joinRoom", chat._id);
  };

  // ✅ Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    try {
      const res = await API.post(
        "/api/message",
        { chatId: currentChat._id, content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");

      socket?.emit("sendMessage", res.data);
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="flex h-screen max-h-screen overflow-hidden bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-800 bg-gray-850 overflow-y-auto">
        <h2 className="p-4 font-bold text-lg border-b border-gray-800">
          Chats
        </h2>
        {chats.map((chat) => {
          const otherUser = chat.participants.find((p) => p._id !== userId);
          return (
            <div
              key={chat._id}
              className={`p-4 cursor-pointer border-b border-gray-800 transition 
                ${
                  currentChat?._id === chat._id
                    ? "bg-gray-700"
                    : "hover:bg-gray-800"
                }`}
              onClick={() => handleSelectChat(chat)}
            >
              <p className="font-semibold text-white">{otherUser?.username}</p>
              <p className="text-sm text-gray-400 truncate">
                {chat.lastMessage?.content || "No messages yet"}
              </p>
            </div>
          );
        })}
      </div>

      {/* Messages area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-800 bg-gray-850 font-semibold sticky top-0">
             
              <div className="relative">
                <span className="font-semibold"> Chat with{" "}
              {currentChat.participants.find((p) => p._id !== userId)?.username}
              </span>
                <FaVideo
                  size={20}
                  className="absolute right-2 top-1 cursor-pointer"
                />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-3 rounded-2xl max-w-xs shadow-md ${
                    msg.sender._id === userId
                      ? "ml-auto bg-blue-600 text-white"
                      : "mr-auto bg-gray-700 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 flex gap-2 border-t border-gray-800 bg-gray-850"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl px-4 py-2 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
