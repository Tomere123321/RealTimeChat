const jwt = require("jsonwebtoken");
let secretKey = "secretKey";

const generateToken = (userId) => {
  return jwt.sign({ userId }, secretKey);
};


module.exports = generateToken;