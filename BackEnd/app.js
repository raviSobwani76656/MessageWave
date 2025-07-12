const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/UserRoute");
const cors = require("cors");
const messageRoutes = require("./routes/MessageRoute");
const verifyToken = require("./middleware/authMiddleware");
const http = require("http");
require("./config/db");
app.use(express.json());
const { Server } = require("socket.io");
const sequelize = require("./config/db");
const cookieParser = require("cookie-parser");

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
  console.log("message sender", socket.id);

  socket.on("join-room", ({ userId, roomId }) => {
    socket.join(roomId);
    console.log(`User with the ${userId}joined the room with id ${roomId}`);
  });

  socket.on("send-message", (data) => {
    console.log("Data", data);
  });

  socket.on("message chat", (msg) => {
    console.log("message", msg);
    io.emit("message send ", msg);
  });

  socket.on("disconnect", () => {
    console.log("sender disconned", socket.id);
  });
});

app.use("/message", messageRoutes);

app.use("/user", userRoutes);

module.exports = { server, sequelize, app };
