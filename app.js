const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const indexroute = require("./routes");
app.use(cors());
app.get("/", (req, res) => {
  res.send("selamat datang di server todo sequelize");
});
app.use(express.json());
app.use(indexroute);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});