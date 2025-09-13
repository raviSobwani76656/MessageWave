const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwtTotkenGenerator = require("../utils/JwtTokenGenerator");
const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");
const { Op } = require("sequelize");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists with this email",
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

    return res.status(201).json({
      status: true,
      message: "User login Succesfull",
      token,
      user: {
        id: userToLogin.id,
        email: userToLogin.email,
        name: userToLogin.name,
        profilePic: userToLogin.profilePic,
      },
    });
  } catch (err) {
    console.log("Error Occured while logging in", err);
    return res
      .status(400)
      .json({ status: false, message: "Error Occrured while logging in " });
  }
};

const logout = async (req, res) => {
  console.log("Logout route hit"); // <--- Step 1
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

const getAllUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const filteredUsers = await User.findAll({
      where: {
        id: { [Op.ne]: loggedInUserId }, // Exclude the logged-in user
      },
      attributes: { exclude: ["password"] }, //Exclude password field
    });

    res.status(200).json({
      status: true,
      message: "Users Fetched SuccessFully",

      data: filteredUsers,
    });
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

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic || !profilePic.startsWith("data:image/")) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    const base64Data = profilePic.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const result = await streamUpload(buffer);

    if (!result || !result.secure_url) {
      return res.status(500).json({ message: "Failed to upload image" });
    }

    console.log("Incoming update request:", req.body);

    const userId = req.body.id;
    console.log("User ID:", userId);

    await User.update(
      {
        profilePic: result.secure_url,
      },
      { where: { id: userId } }
    );

    const updatedUser = await User.findByPk(userId);

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  logout,
  getUser,
  getAllUsersForSidebar,
  updateProfile,
};
