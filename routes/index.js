const express = require("express");
const route = express.Router();

const userRoute = require("./user.route");
const todoRoute = require("./todo.route");
const { authMiddleware, isAdmin } = require("../middlewares/auth-middleware");
route.get("/", (req, res) => {
  res.json({
    message: "selamat datang di server todo sequelize",
  });
});

route.use("/users", authMiddleware, isAdmin, userRoute);
route.use("/todos", authMiddleware, todoRoute);
route.use("/auth", require("./auth.route"));
route.get("/verify", authMiddleware, (req, res) => {
  res.json({
    message: "valid token",
    token: req.headers.authorization.split(" ")[1],
  });
});
module.exports = route;
