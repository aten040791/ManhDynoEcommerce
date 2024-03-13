const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

require("./config/config.js");

dotenv.config();

//port
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json()); // permission to send JSON file
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// test api
app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

//server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
