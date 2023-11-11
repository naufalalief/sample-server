const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { login, register } = require("../controllers/auth.controller");

route.post("/login", login);
route.post("/register", register);

module.exports = route;
