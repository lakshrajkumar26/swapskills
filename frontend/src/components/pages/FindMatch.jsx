import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import axios from "axios";
import { VideoCall, Chat } from "@mui/icons-material";

const FindMatch = () => {
  const [activeTab, setActiveTab] = useState("matches"); // matches | all
  const [matches, setMatches] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const token = localStorage.getItem("token");
  
 

//   Fetch matches
useEffect(() => {
  const fetchMatches = async () => {
    try {
      console.log("Fetching users... match");
      const res = await API.get("/api/users/match", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ safe one-liner
      setMatches(Array.isArray(res.data?.data) ? res.data?.data : []);
      console.log("Matches array:", res.data);
      
    } catch (err) {
      console.error("Failed to fetch matches", err);
      setMatches([]);
    }
  };

  fetchMatches();
}, [token]);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      console.log("Fetching users... all users");
      const res = await API.get("/api/users/allusers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ should setUsers not setMatches
      setUsers(Array.isArray(res.data?.user) ? res.data.user : []);
      console.log("Users array:", res.data);
      console.log("ye dekh",users)
    } catch (err) {
      console.error("Failed to fetch users", err);
      setUsers([]);
    }
  };

  fetchUsers();
}, [token]);

  // Select user -> load profile
  const handleSelectUser = async (userId) => {
    try {
      const res = await API.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedUser(res.data?.user);
      console.log( "ye clcik hua ",selectedUser);
      setMessages([]); // clear chat for new user
    } catch (err) {
      console.error("Failed to load user profile", err);
    }
  };

  // Send message (dummy for now)
  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, { text: newMessage, me: true }]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="flex justify-around py-3 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("matches")}
            className={`px-4 py-1 rounded ${
              activeTab === "matches" ? "bg-gray-700" : ""
            }`}
          >
            Matches
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1 rounded ${
              activeTab === "all" ? "bg-gray-700" : ""
            }`}
          >
            All Users  
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {(activeTab === "matches" ? matches : users).map((u) => (
            <div
              key={u._id}
              onClick={() => handleSelectUser(u._id)}
              className="p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700"
            >
              <p className="font-semibold">{u.username}</p>
              <p className="text-sm text-gray-400">{u.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="w-1/4 bg-gray-850 border-r border-gray-700 p-4">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-bold mb-2">{selectedUser.username}</h2>
            <p className="text-gray-400 mb-4">{selectedUser.email}</p>
            <p>
              <strong>Skills Offered:</strong>{" "}
              {selectedUser.skillsOffered?.join(", ")}
            </p>
            <p>
              <strong>Skills Wanted:</strong>{" "}
              {selectedUser.skillsWanted?.join(", ")}
            </p>
          </>
        ) : (
          <p>Select a user to view profile</p>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
          {selectedUser ? (
            <h3 className="font-semibold">{selectedUser.username}</h3>
          ) : (
            <h3>Chat</h3>
          )}
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-700 rounded">
              <Chat />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded">
              <VideoCall />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded max-w-xs ${
                msg.me ? "bg-blue-600 ml-auto" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700 flex">
          <input
            type="text"
            className="flex-1 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindMatch;
