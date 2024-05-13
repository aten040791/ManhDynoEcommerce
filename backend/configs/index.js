const app = require("configs/app")
const database = require("configs/database")
const jwt = require("configs/jwt")

const config = {
    app,
    database,
    jwt
}

module.exports.config = config