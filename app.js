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

app.use(
  cors({
    origin: "https://todos-apppal.netlify.app", // Replace this with your actual origin
  })
);
if (swaggerDocument) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.get("/", (req, res) => {
  res.send(`
    <h1>Selamat datang di server todo sequelize</h1>
    <a href="/docs">Lihat dokumentasi API</a>
  `);
});

app.use(express.json());
app.use(indexroute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
