import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate,  } from "react-router-dom";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("matches"); // "matches" or "all"
  const [matches, setMatches] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const Navigate = useNavigate();

  // ✅ Fetch matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await API.get("/api/users/match", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(Array.isArray(res.data?.data) ? res.data?.data : []);
      } catch (err) {
        console.error("Failed to fetch matches", err);
      }
    };
    fetchMatches();
  }, [token]);

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/api/users/allusers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(Array.isArray(res.data?.user) ? res.data.user : []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, [token]);

  // ✅ Handle user click
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Tabs */}
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

        {/* User List */}
        <div className="overflow-y-auto flex-1">
          {(activeTab === "matches" ? matches : users).map((u) => (
            <div
              key={u._id}
              onClick={() => handleSelectUser(u)}
              className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${
                selectedUser?._id === u._id ? "bg-gray-700" : ""
              }`}
            >
              <p className="font-semibold">{u.username}</p>
              <p className="text-sm text-gray-400">{u.email}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Profile */}
      <div className="flex-1 p-6">
        {selectedUser ? (
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedUser.username}</h2>
            <p className="text-gray-400 mb-2">{selectedUser.email}</p>
            <p className="mb-4">
              <span className="font-semibold">Role: </span>
              {selectedUser.role}
            </p>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Skills Offered</h3>
              <div className="flex flex-wrap gap-2">
                {selectedUser.skillsOffered?.length > 0 ? (
                  selectedUser.skillsOffered.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No skills added</p>
                )}
              </div>
            </div>

            {/* Chat Button */}
            <button
              // onClick={() => navigate(`/chat/${selectedUser._id}`)}
              onClick={()=>Navigate("/chat")}
              className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg shadow"
            >
              Chat
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">
            Select a user to view profile.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPage;











// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import API from "../../api/axios";

// const SOCKET_URL = "http://localhost:8080"; // ✅ backend server

// const FindMatch = () => {
//   const [activeTab, setActiveTab] = useState("matches"); // matches | all | chats
//   const [matches, setMatches] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [chats, setChats] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [socket, setSocket] = useState(null);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   // 🔌 Connect socket
//   useEffect(() => {
//     const newSocket = io(SOCKET_URL, {
//       query: { userId },
//     });
//     setSocket(newSocket);

//     newSocket.on("newMessage", (message) => {
//       if (currentChat && message.chat === currentChat._id) {
//         setMessages((prev) => [...prev, message]);
//       }
//     });

//     return () => newSocket.disconnect();
//   }, [userId, currentChat]);

//   // ✅ Fetch matches
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         console.log("Fetching users... match");
//         const res = await API.get("/api/users/match", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // ✅ safe one-liner
//         setMatches(Array.isArray(res.data?.data) ? res.data?.data : []);
//         console.log("Matches array:", res.data);
//       } catch (err) {
//         console.error("Failed to fetch matches", err);
//       }
//     };
//     fetchMatches();
//   }, [token]);

//   // ✅ Fetch all users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await API.get("/api/users/allusers", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(Array.isArray(res.data?.user) ? res.data.user : []);
//       } catch (err) {
//         console.error("Failed to fetch users", err);
//       }
//     };
//     fetchUsers();
//   }, [token]);

  // ✅ Fetch chats
  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const res = await API.get("/api/chat/chats", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setChats(Array.isArray(res.data) ? res.data : []);
  //     } catch (err) {
  //       console.error("Failed to fetch chats", err);
  //     }
  //   };
  //   fetchChats();
  // }, [token]);

  // // ✅ Fetch messages of a selected chat
  // const fetchMessages = async (chatId) => {
  //   try {
  //     const res = await API.get(`/api/message/${chatId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setMessages(Array.isArray(res.data) ? res.data : []);
  //   } catch (err) {
  //     console.error("Failed to fetch messages", err);
  //   }
  // };

  // // ✅ Start chat with a user
  // const handleSelectUser = async (otherUserId) => {
  //   try {
  //     const res = await API.post(
  //       `/api/chat/${otherUserId}`,
  //       {},
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     setCurrentChat(res.data);
  //     fetchMessages(res.data._id);

  //     socket?.emit("joinRoom", res.data._id);
  //   } catch (err) {
  //     console.error("Error starting chat", err);
  //   }
  // };

  // // ✅ When clicking on a chat
  // const handleSelectChat = (chat) => {
  //   setCurrentChat(chat);
  //   fetchMessages(chat._id);

  //   socket?.emit("joinRoom", chat._id);
  // };

  // // ✅ Send message
  // const handleSendMessage = async (e) => {
  //   e.preventDefault();
  //   if (!newMessage.trim() || !currentChat) return;

  //   try {
  //     const res = await API.post(
  //       "/api/message",
  //       { chatId: currentChat._id, content: newMessage },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     setMessages((prev) => [...prev, res.data]);
  //     setNewMessage("");

  //     socket?.emit("sendMessage", res.data);
  //   } catch (err) {
  //     console.error("Failed to send message", err);
  //   }
  // };

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       {/* Left Sidebar */}
//       <div className="w-1/3 border-r border-gray-700 flex flex-col">
//         <div className="flex justify-around py-3 border-b border-gray-700">
//           <button
//             onClick={() => setActiveTab("matches")}
//             className={`px-4 py-1 rounded ${
//               activeTab === "matches" ? "bg-gray-700" : ""
//             }`}
//           >
//             Matches
//           </button>
//           <button
//             onClick={() => setActiveTab("all")}
//             className={`px-4 py-1 rounded ${
//               activeTab === "all" ? "bg-gray-700" : ""
//             }`}
//           >
//             All Users
//           </button>
//           <button
//             onClick={() => setActiveTab("chats")}
//             className={`px-4 py-1 rounded ${
//               activeTab === "chats" ? "bg-gray-700" : ""
//             }`}
//           >
//             Chats
//           </button>
//         </div>

//         <div className="overflow-y-auto flex-1">
//           {(activeTab === "matches"
//             ? matches
//             : activeTab === "all"
//             ? users
//             : chats
//           ).map((u) => {
//             const displayUser =
//               activeTab === "chats"
//                 ? u.participants.find((p) => p._id !== userId)
//                 : u;

//             return (
//               <div
//                 key={u._id}
//                 onClick={() =>
//                   activeTab === "chats"
//                     ? handleSelectChat(u)
//                     : handleSelectUser(u._id)
//                 }
//                 className="p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700"
//               >
//                 <p className="font-semibold">{displayUser?.username}</p>
//                 <p className="text-sm text-gray-400">{displayUser?.email}</p>
//                 {activeTab === "chats" && (
//                   <p className="text-sm text-gray-400 italic">
//                     {u.lastMessage ? u.lastMessage.content : "No messages yet"}
//                   </p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Right Chat Window */}
//       <div className="w-2/3 flex flex-col">
//         {currentChat ? (
//           <>
//             {/* Chat Header */}
//             <div className="p-4 border-b border-gray-700">
//               <h2 className="font-bold text-lg">
//                 {
//                   currentChat.participants.find((p) => p._id !== userId)
//                     ?.username
//                 }
//               </h2>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
//               {messages.map((m) => {
//                 const isMe = String(m.sender._id) === String(userId);
//                 return (
//                   <div
//                     key={m._id}
//                     className={`p-3 rounded max-w-xs ${
//                       isMe
//                         ? "bg-blue-600 self-end text-right ml-auto"
//                         : "bg-gray-700 self-start text-left"
//                     }`}
//                   >
//                     <p>{m.content}</p>
//                     <p className="text-xs text-gray-400 mt-1">
//                       {m.sender.username}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Input Box */}
//             <form
//               onSubmit={handleSendMessage}
//               className="p-4 border-t border-gray-700 flex"
//             >
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 className="flex-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
//                 placeholder="Type a message..."
//               />
//               <button
//                 type="submit"
//                 className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
//               >
//                 Send
//               </button>
//             </form>
//           </>
//         ) : (
//           <div className="flex items-center justify-center flex-1 text-gray-500">
//             Select a user or chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FindMatch;
