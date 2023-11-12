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

route.use("/users", isAdmin, userRoute);
route.use("/todos", authMiddleware, todoRoute);
route.use("/auth", require("./auth.route"));
module.exports = route;
