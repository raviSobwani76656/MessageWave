const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exisits with this email",
      });
    }

    const newUser = await User.create({ name, email, password: password });
    res
      .status(201)
      .json({ status: true, message: "User Created Succesfully", newUser });
  } catch (err) {
    console.log("Error occured while creating the new User", err);
    return res.status(400).json({
      status: false,
      message: "Error Occured while creating the User",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userToLogin = await User.findOne({ where: { email } });

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Please provide Valid email and password",
    });
  }

  if (!userToLogin) {
    console.log("User with this Email does not exist");
    return res
      .status(404)
      .json({ status: false, message: "User with the email does not exist" });
  }

  return res
    .status(201)
    .json({ status: false, message: "User login Succesfull" });
};

module.exports = { createUser, loginUser };
