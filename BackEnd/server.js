const app = require("./app");
require("dotenv").config();
const sequelize = require("./config/db");
const conrs = require("cors");

const PORT = process.env.PORT || 5000;

// Sync the DB and start the server only after syncing
sequelize
  .sync({ alter: true }) // { force: true } would drop and recreate tables
  .then(() => {
    console.log("Database synced successfully.");
    // Start the server after DB sync
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });
