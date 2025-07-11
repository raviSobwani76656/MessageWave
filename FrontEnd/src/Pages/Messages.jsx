import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { useLocation } from "react-router-dom";

function Messages() {
  const [message, setMessage] = useState("");
  const location = useLocation();

  const { userId, userName, room } = location.state || {};

  const handleSendMessage = () => {
    if (message !== "") {
      const messageData = {
        message: message,
        useName: userName,
        room: room,
      };

      socket.emit("send-message", {
        messageData,
      });
    }
  };

  useEffect(() => {
    socket.on("get-message", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <div>Messages</div>
      <input
        type="text"
        placeholder="Hey..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button onClick={handleSendMessage}>send</button>
    </>
  );
}

export default Messages;
