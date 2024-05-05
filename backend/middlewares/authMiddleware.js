const rs = require("../services/response");
const jwt = require("jsonwebtoken");
module.exports = {
  guest: (req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      rs.error(res, "Access token is required");
    }

    jwt.verify(access_token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) {
        rs.authorization(res, "Unauthorized");
      }
      console.log(user);
    });
  },
};
