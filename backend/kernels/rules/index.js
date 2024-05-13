const { body } = require("express-validator");
const { StringUtil } = require("services/utils");

class BodyWithLocale 
{
    constructor(field) {
        this.bodyWithLocale = body(field)
        this.field = field;
    }

    notEmpty() {
        this.bodyWithLocale = this.bodyWithLocale.notEmpty().withMessage(StringUtil.capitalize(this.field) +" must be required")
        return this
    }

    isEmail() {
        this.bodyWithLocale = this.bodyWithLocale.isEmail().withMessage(StringUtil.capitalize(this.field)+" is not in correct format")
        return this
    }

    isLength(options) {
        if (options.min) {
            this.bodyWithLocale = this.bodyWithLocale.isLength({min: options.min}).withMessage(StringUtil.capitalize(this.field)+" must be at least " + options.min + " characters long")
        }

        if (options.max) {
            this.bodyWithLocale = this.bodyWithLocale.isLength({max: options.max}).withMessage(StringUtil.capitalize(this.field)+" must be at most " + options.max + " characters long")
        }

        return this;
    }

    confirmed(fieldToCompare) {
        this.bodyWithLocale = this.bodyWithLocale.custom((value) => {
            if (value !== fieldToCompare) {
                throw new Error(StringUtil.capitalize(this.field) + " and " + fieldToCompare + " do not match");
            }
            return true;
        });

        return this;
    }

    get() {
        return this.bodyWithLocale
    }

}

module.exports = BodyWithLocale