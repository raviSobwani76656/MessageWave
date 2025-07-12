const { jwtSecret } = require("../config/index");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const authToken = req.headers["authorization"];

  // if (!authToken || !authToken.startsWith("Bearer ")) {
  //   console.log("No Token Provided");
  //   return res
  //     .status(401)
  //     .json({ status: false, message: "No Token Provided" });
  // }

  // const token = authToken.split(" ")[1];

  token = req.cookies.jwt;

  if (!token) {
    console.log("token not available");
    res.status(400).json({ status: false, message: "Token not available" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Invalid Token", err);
    return res.status(401).json({ status: false, message: "Invalid Token" });
  }
};

module.exports = verifyToken;
