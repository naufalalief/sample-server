const { User } = require("../models");

module.exports = {
  getAllData: async (req, res) => {
    try {
      const data = await User.findAll({
        where: {
          id_level: 2,
        },
      });
      res.status(200).send({
        message: "get all data",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getDataByID: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await User.findOne({
        where: {
          id,
        },
      });
      res.status(200).send({
        message: "get data by id",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  updateData: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, username, email, password } = req.body;
      const data = await User.update(
        {
          name,
          username,
          email,
          password,
        },
        {
          where: {
            id,
          },
        }
      );
      if (!name || !username || !email || !password) {
        res.status(400).send({
          message: "all field must be filled",
        });
      } else {
        res.status(200).send({
          message: "update data",
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  binData: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await User.destroy({
        where: {
          id,
          id_level: 2,
        },
      });
      if (!data) {
        res.status(404).send({
          message: "data not found",
        });
      } else {
        res.status(200).send({
          message: "delete data",
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  createData: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;
      const data = await User.create({
        name,
        username,
        email,
        password,
      });
      if (!name || !username || !email || !password) {
        res.status(400).send({
          message: "all field must be filled",
        });
      } else {
        res.status(201).send({
          message: "create data",
          data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
