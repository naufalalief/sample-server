const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();
module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }
    const login = await User.findOne({
      where: {
        username,
      },
    });

    if (login) {
      const compare = bcrypt.compareSync(password, login.password);
      if (compare) {
        const expired = "1d";
        const token = jwt.sign(
          {
            username: login.username,
            id_user: login.id,
            lastChanged: login.updatedAt,
          },
          process.env.JWT_KEY,
          {
            expiresIn: expired,
          }
        );
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);
        res.status(200).json({
          message: "Login Succesfully",
          id_user: login.id,
          token: token,
          expiresIn: expirationDate,
        });
      } else {
        res.status(404).json({
          message: "Login failed, user not found",
        });
      }
    } else {
      res.status(400).json({
        message: "Login failed",
      });
    }
  },
  register: async (req, res) => {
    let { name, username, email, password } = req.body;
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }
    const isExist = await User.findOne({
      where: {
        email,
      },
    });
    if (isExist) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }
    let garem = 10;
    let hash = bcrypt.hashSync(password, garem);
    password = hash;
    await User.create({
      name,
      username,
      email,
      password,
      id_level: 2,
    });
    res.status(200).json({
      message: "Register success",
    });
  },
};
