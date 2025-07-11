const { jwtSecret } = require("../config");
const jwt = require("jsonwebtoken");

const jwtTotkenGenerator = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
};

module.exports = jwtTotkenGenerator;
