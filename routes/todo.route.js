const express = require("express");
const route = express.Router();

const {
  getAllData,
  getDataByID,
  updateData,
  binData,
  createData,
  getAllDatas,
} = require("../controllers/todo.controller");
route.get("/admin/todolists", getAllDatas);
route.get("/", getAllData);
route.get("/:id", getDataByID);
route.put("/:id", updateData);
route.delete("/:id", binData);
route.post("/", createData);

module.exports = route;
