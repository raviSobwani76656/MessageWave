const User = require("../models/User");
const bcrypt = require("bcrypt");

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

    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ name, email, password: hashpassword });
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
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Please provide Valid email and password",
      });
    }

    const userToLogin = await User.findOne({ where: { email } });

    if (!userToLogin) {
      console.log("User with this Email does not exist");
      return res
        .status(404)
        .json({ status: false, message: "User with the email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, userToLogin.password);

    if (!isMatch) {
      console.log("Invalid Password");
      return res
        .status(400)
        .json({ status: false, message: "Invalid password" });
    }

    return res
      .status(201)
      .json({ status: true, message: "User login Succesfull" });
  } catch (err) {
    console.log("Error Occured while logging in", err);
    return res
      .status(400)
      .json({ status: false, message: "Error Occrured while logging in " });
  }
};

// const forgotPassword = async (req, res) => {
//     try{
//   const { email } = req.body;

//   const user = await User.findOne({ where: { email } });

//   if (!user) {
//     console.log("The user you are looking for is not available");

//   }

// }

// catch(err){
//     console.log("Error Occured while Updating the password", err)
//     res.status(400).json({status:false, message:"Error Occrured while Updating the password"})
// }

// }

module.exports = { createUser, loginUser };
