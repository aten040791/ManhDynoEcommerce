require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("routes/api");
const { swaggerUIServe,swaggerUISetup } = require("kernels/api-docs");

const app = express();
app.disable("x-powered-by");
const port = 3000;

app.use(bodyParser.json());
app.use("/", [], router);
app.use(express.json());

app.use("/api-docs", swaggerUIServe, swaggerUISetup);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

module.exports = app