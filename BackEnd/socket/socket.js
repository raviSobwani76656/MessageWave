// const { Server } = require("socket.io");
// const http = require("http");
// const express = require("express");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"],
//   },
// });

// io.on("connected", (socket) => {
//   console.log("A User connected", socket.id);

//   socket.on("Disconnted", (socket) => {
//     console.log("A User Disconnected", socket.id);
//   });
// });

// export { io, app, server };
const { Server } = require("socket.io");
const Messages = require("../models/Messages");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    // Join a room
    socket.on("join-room", ({ userId, roomId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    // Handle sending messages
    socket.on("send-message", async (messageData) => {
      const { room, message, time } = messageData;
      console.log("Message received:", messageData);

      try {
        await Messages.create({ content: message, time });
        console.log("Message saved in the database successfully");
      } catch (e) {
        console.error("Error occurred while saving the message:", e);
      }

      io.to(room).emit("receive_message", messageData);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
