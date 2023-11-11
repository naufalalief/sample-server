const express = require("express");
const route = express.Router();
const { getAllData, getDataByID, updateData, binData, createData } = require("../controllers/user.controller");

route.get('/', getAllData)
route.get('/:id', getDataByID)
route.delete('/:id', binData)


module.exports = route;