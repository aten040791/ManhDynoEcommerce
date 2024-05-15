const jwt = require("jsonwebtoken");
const response = require("utils/responseUtils");
const { config } = require("configs");

const authenticated = (req, res, next) => {
  let access_token = req.headers.authorization;

  if (access_token) {
    access_token = access_token.split(" ")[1];

    jwt.verify(access_token, config.jwt.secret, (error, user) => {
      if (error) {
        return response.unauthorized(res);
      }
      if (user) {
        req.user = user;
        return next();
      } else {
        return response.error(res);
      }
    });
  } else {
    return response.error(res, "Access is required");
  }
};

module.exports = authenticated;
