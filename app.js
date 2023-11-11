const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");

let swaggerDocument;
try {
  const file = fs.readFileSync("./docs/api-docs.yaml", "utf8");
  swaggerDocument = YAML.parse(file);
} catch (err) {
  console.error("Failed to load api-docs.yaml:", err);
}

const port = process.env.PORT || 3000;

const cors = require("cors");

const indexroute = require("./routes");

app.use(cors());
if (swaggerDocument) {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
// app.get("/", (req, res) => {
//   res.send("selamat datang di server todo sequelize");
// });

app.use(express.json());
app.use(indexroute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});