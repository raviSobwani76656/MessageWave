const express = require("express");
require("dotenv").config();
const app = express();

require("./config/db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`node.js server is running`);
});

module.exports = app;
