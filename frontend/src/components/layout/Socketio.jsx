import React, { useEffect } from "react";
import socket from "./SocketConig"; // ✅ import same socket instance


const Socketio = () => {
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log(`socket connected ${socket.id}`);
    });

    socket.on("welcome", (data) => {
      console.log("Welcome:", data);
    });

    socket.on("others", (d) => {
      console.log("Others:", d);
    });

    socket.on("disconnect", () => {
      console.log(`socket disconnected`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Socketio Connected</div>;
};

export default Socketio;
