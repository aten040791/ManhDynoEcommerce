const { param } = require("express-validator");
const {BodyWithLocale} = require("kernels/rules");

class ParamWithLocale extends BodyWithLocale 
{
    constructor(field) {
        super(field)
        this.withLocale = param(field)
    }

    matches(regex) {
        this.withLocale = this.withLocale.matches(regex)
        return this;
    }
}

module.exports = ParamWithLocale