const { param } = require("express-validator");
const {BodyWithLocale} = require("kernels/rules");

class ParamsWithLocale extends BodyWithLocale 
{
    constructor(field) {
        this.field = param(field)
    }
}

module.exports = ParamsWithLocale