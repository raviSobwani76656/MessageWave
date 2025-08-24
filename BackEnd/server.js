// const { app, server } = require("./app");
// require("dotenv").config();
// const sequelize = require("./config/db");

// const PORT = process.env.PORT || 5002;
// // Sync the DB and start the server only after syncing
// sequelize
//   .sync({ alter: true }) // { force: true } would drop and recreate tables
//   .then(() => {
//     console.log("Database synced successfully.");
//     // Start the server after DB sync
//     server.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to sync database:", error);
//   });
const http = require("http");
const app = require("./app");
const initializeSocket = require("./socket/socket");
const sequelize = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5002;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);

// Sync the database and start the server
sequelize
  .sync({ alter: true }) // { force: true } would drop and recreate tables
  .then(() => {
    console.log("Database synced successfully.");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });

module.exports = { server, io };
