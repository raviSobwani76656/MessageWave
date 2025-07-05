const express = require("express");
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/UserRoute");
const cors = require("cors");

require("./config/db");

app.use(cors());

app.use(express.json());

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
