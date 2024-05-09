const rs = require("../services/response");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res) => {
  let access_token = req.headers.authorization;
  if (access_token) {
    access_token = access_token.split(" ")[1];
    jwt.verify(access_token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        return rs.error(res, "Unauthorized");
      }
      if (user) {
        req.user = user;
      } else {
        return rs.error(res, "Unauthorized");
      }
    });
  } else {
    return rs.error(res, "Access is required");
  }
};

module.exports = {
  user: (req, res, next) => {
    verifyToken(req, res);
    if (req.user && req.user.role !== "admin") {
      next();
    } else {
      return rs.error(res, "Unauthorized");
    }
  },
  owner: (req, res, next) => {
    verifyToken(req, res);
    if (req.user.role === "owner") {
      next();
    } else {
      return rs.authorization(res, "Unauthorized");
    }
  },
  admin: (req, res, next) => {
    verifyToken(req, res);
    if (req.user.role === "admin") {
      next();
    } else {
      return rs.authorization(res, "Unauthorized");
    }
  },
};
