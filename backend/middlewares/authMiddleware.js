const rs = require("../services/response");
const jwt = require("jsonwebtoken");
module.exports = {
  guest: (req, res, next) => {
    let access_token = req.headers.token;

    if (access_token) {
      access_token = access_token.split(" ")[1];
      jwt.verify(access_token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
          return rs.authorization(res, "Unauthorized");
        }
        console.log(user);
        next();
      });
    } else {
      return rs.error(res, "Access token is required");
    }
  },
};
