const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwtTotkenGenerator = require("../utils/JwtTokenGenerator");

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

    const token = jwtTotkenGenerator({
      id: userToLogin.id,
      email: userToLogin.email,
      name: userToLogin.name,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ status: true, message: "User login Succesfull", token });
  } catch (err) {
    console.log("Error Occured while logging in", err);
    return res
      .status(400)
      .json({ status: false, message: "Error Occrured while logging in " });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res
      .status(201)
      .json({ status: true, message: "Logout SuccessFull" });
  } catch (err) {
    console.log("Error Occured While loggin out", err);
    res.json(500).json({ status: false, message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || receiverId) {
      console.log("Both senderID and receierId needed to be present");
      return res.status(400).json({
        status: false,
        message: "Both SenderId and receiverId needed to be present",
      });
    }

    const allUsers = await User.findAll({
      where: { senderId, receiverId },
      order: [[]],
    });

    res.status().json({ status: true, message: "Users Fetched SuccessFully" });
  } catch (err) {
    console.log("Error Occured while fetching the users", err);
    return res.status(500).json({
      status: false,
      message: "Error Occured while fetching the users",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userToGet = req.user.id;

    const currentUser = await User.findByPk(userToGet, {
      attributes: { exclude: ["password"] },
    });

    if (!currentUser) {
      console.log("Desired User does not Exist");
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: currentUser });
  } catch (e) {
    console.log("Error Occurred:", e.message);
    res.status(500).json({
      status: false,
      message: "Error occurred while getting the user",
    });
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

module.exports = { createUser, loginUser, logout, getUser };
