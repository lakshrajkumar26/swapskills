// src/socket.js
import { io } from "socket.io-client";

const URL = "https://swapskills.onrender.com"; // backend server
const token = localStorage.getItem("token");

export const socket = io(URL, {
  auth: { token },
  autoConnect: false, // connect only when needed
});

// Optional: log connection events for debugging
socket.on("connect", () => {
  console.log("✅ Connected to socket:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from socket");
});

socket.on("connect_error", (err) => {
  console.error("⚠️ Socket connection error:", err.message);
});
