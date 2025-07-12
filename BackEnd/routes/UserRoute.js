const express = require("express");

const {
  createUser,
  loginUser,
  logout,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/logout", logout);

module.exports = router;
