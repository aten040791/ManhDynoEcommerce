const demoMiddleware = function(req, res, next){
    console.log("First middleware");
    return next();
}

module.exports = demoMiddleware;