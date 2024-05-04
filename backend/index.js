require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("routes/api");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use("/", [], router);
app.use(express.json());
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
