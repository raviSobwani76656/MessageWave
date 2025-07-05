const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/UserRoute");

require("./config/db");

app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
