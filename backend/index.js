require('dotenv').config({
  path: './.env'
})
require('rootpath')()
const express = require('express')
const router = require('routes/api')
const app = express()
const port = 3000

app.use("/",[], router);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})