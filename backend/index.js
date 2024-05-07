require("dotenv").config({
  path: "./.env",
});
require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const router = require("routes/api");
const app = express();
app.disable("x-powered-by");
const port = 3000;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Open API Coding Blog ",
      version: "1.0.11",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./swagger/*.yaml"],
};

const openapiSpecification = swaggerJsdoc(options);
app.use("/api", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use(bodyParser.json());
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
