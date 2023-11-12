const { Todo } = require("../models");

module.exports = {
  getAllData: async (req, res) => {
    try {
      const userId = req.payload.id;
      const username = req.payload.username;
      console.log(userId);
      const data = await Todo.findAll({
        where: {
          id_user: userId,
        },
      });
      res.status(200).json({
        message: "get all data by current user " + username,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getDataByID: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Todo.findOne({
        where: {
          id,
        },
      });
      res.status(200).json({
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
      const id_user = req.payload.id;
      const { name, isdone } = req.body;
      console.log(id, id_user, name, isdone)
      if (req.payload.id !== id_user) {
        return res.status(401).json({
          message: "you are not authorized",
        });
      }
      if (name === undefined || isdone === undefined) {
        return res.status(400).json({
          message: "all field must be filled",
        });
      }
      const data = await Todo.update(
        {
          name,
          isdone,
          id_user,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({
        message: "data updated successfully",
        data: {
          id,
          name,
          isdone,
          id_user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  binData: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Todo.destroy({
        where: {
          id,
        },
      });
      if (!data) {
        res.status(404).json({
          message: "data not found",
        });
      } else {
        res.status(200).json({
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
      const { name, isdone = false } = req.body;
      if (!name) {
        return res.status(400).json({
          message: "all field must be filled",
        });
      }
      const id_user = req.payload.id;
      const data = await Todo.create({
        name,
        isdone,
        id_user,
      });
      res.status(201).json({
        message: "data created successfully",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
