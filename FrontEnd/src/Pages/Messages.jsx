import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { useLocation } from "react-router-dom";

function Messages() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const location = useLocation();

  const { userId, userName, room } = location.state || {};

  // Join the room when the component mounts
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    console.log("Connected to socket:", socket.connected);

    // Join the room
    socket.emit("join-room", { userId, roomId: room });

    // Listen for messages
    socket.on("receive_message", (data) => {
      console.log("Received:", data);
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [userId, room]);

  // Send a message
  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      message,
      useName: userName,
      room,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send-message", messageData);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h2 className="text-xl font-semibold">Chat Room: {room}</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.useName === userName ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-sm ${
                msg.useName === userName
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <div className="flex items-baseline space-x-2">
                <strong className="text-sm font-semibold">{msg.useName}</strong>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className="mt-1">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
