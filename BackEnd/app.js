const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/UserRoute");
const cors = require("cors");
const messageRoutes = require("./routes/MessageRoute");
const verifyToken = require("./middleware/authMiddleware");
const http = require("http");
require("./config/db");
const { Server } = require("socket.io");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");
const Messages = require("./models/Messages");

app.use(express.json({ limit: "10mb" }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: "true",
  },
});

io.on("connection", (socket) => {
  console.log("New socket connected:", socket.id);

  socket.on("join-room", ({ userId, roomId }) => {
    socket.join(roomId);
    console.log(`User ${userId} joined room ${roomId}`);
  });

  socket.on("send-message", (messageData) => {
    const { room } = messageData;
    console.log("Message received:", messageData);

    const { message, time } = messageData;

    try {
      const messageSave = Messages.create({ content: message, time });
      console.log("Message Saved in the database Succesfully");
    } catch (e) {
      console.log("Error Occured While saving the message");
    }

    io.to(room).emit("receive_message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});
app.use("/message", messageRoutes);

app.use("/user", userRoutes);

module.exports = { server, sequelize, app };
