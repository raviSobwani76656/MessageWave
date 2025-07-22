const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
  createUser,
  loginUser,
  logout,
  getUser,
  getAllUsersForSidebar,
  updateProfile,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/logout", logout);
router.get("/getUser", verifyToken, getUser);
router.get("/getAllUsersForSidebar", verifyToken, getAllUsersForSidebar);
router.post("/updateProfile", verifyToken, updateProfile);

module.exports = router;
