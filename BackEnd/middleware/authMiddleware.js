const { jwtSecret } = require("../config/index");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  token = req.cookies.jwt;

  if (!token) {
    console.log("Unauthorised-Token Not Provided");
    return res
      .status(400)
      .json({ status: false, message: "Unauthorised-Token Not Provided" });
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
