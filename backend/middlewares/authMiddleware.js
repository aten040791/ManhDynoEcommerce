const rs = require("../services/response");
const jwt = require("jsonwebtoken");
module.exports = {
  user: (req, res, next) => {
    let access_token = req.headers.authorization;
    if (access_token) {
      access_token = access_token.split(" ")[1];
      jwt.verify(access_token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
          return rs.authorization(res, "Unauthorized");
        }
        if (user) {
          next();
        }
      });
    } else {
      return rs.error(res, "Access token is required");
    }
  },
  owner: (req, res, next) => {
    let access_token = req.headers.authorization;
    if (access_token) {
      access_token = access_token.split(" ")[1];
      jwt.verify(access_token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
          return rs.authorization(res, "Unauthorized");
        }
        if (user.role == "owner") {
          next();
        }
      });
    } else {
      return rs.error(res, "Access token is required");
    }
  },
};
