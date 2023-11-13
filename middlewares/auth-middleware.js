const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models");
const key = process.env.JWT_KEY;

const authMiddleware = async (req, res, next) => {
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
    const user = await User.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!user || user.updatedAt > payload.lastChanged) {
      return res.status(403).json({
        message: "invalid token",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "invalid token",
    });
  }
};
const isAdmin = (req, res, next) => {
  if (req.payload && req.payload.id_level === 1) {
    next();
  } else {
    console.log(req.payload);
    return res.status(403).json({
      message: "Forbidden",
      req: req.payload,
    });
  }
};
module.exports = { authMiddleware, isAdmin };
