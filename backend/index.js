require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("routes/api");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use("/", [], router);
app.use(express.json());

app.use((req, res) => {
  return res.status(500).send({
    success: false,
    status: 500,
    message: "Internal Server Error",
  });
});
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
