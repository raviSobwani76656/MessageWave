const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/UserRoute");
const cors = require("cors");
const messageRoutes = require("./routes/MessageRoute");
const verifyToken = require("./middleware/authMiddleware");
require("./config/db");
app.use(express.json());

app.use(cors());
app.use("/message", messageRoutes);

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
