const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`node.js server is running`);
});

module.exports = app;
