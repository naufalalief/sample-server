const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.JWT_KEY;

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(403).json({
      message: "you dont have to access this page(s)",
    });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      message: "you dont have to access this page(s)",
    });
  }

  try {
    const payload = jwt.verify(token, key);
    req.payload = payload;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "invalid token",
    });
  }
};

module.exports = authMiddleware;
