const response = require("services/response");

module.exports = {
    role: (roleName) => (req, res, next) => {
        if (req.user && req.user.role !== roleName) {
            return next()
        } 
        
        return response.unauthorized(res)
    }
};