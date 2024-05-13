const { body } = require("express-validator");
const { StringUtil } = require("services/utils");

class BodyWithLocale 
{
    constructor(field) {
        this.bodyWithLocale = body(field)
        this.field = field;
    }

    notEmpty() {
        this.bodyWithLocale = this.bodyWithLocale.notEmpty().withMessage(StringUtil.capitalize(this.field) +" must be required").bail()
        return this
    }

    isEmail() {
        this.bodyWithLocale = this.bodyWithLocale.isEmail().withMessage(StringUtil.capitalize(this.field)+" is not in correct format").bail()
        return this
    }

    isLength(options) {
        if (options.min) {
            this.bodyWithLocale = this.bodyWithLocale.isLength({min: options.min}).withMessage(StringUtil.capitalize(this.field)+" must be at least " + options.min + " characters long").bail()
        }

        if (options.max) {
            this.bodyWithLocale = this.bodyWithLocale.isLength({max: options.max}).withMessage(StringUtil.capitalize(this.field)+" must be at most " + options.max + " characters long").bail()
        }

        return this;
    }

    confirmed(fieldToCompare) {
        this.bodyWithLocale = this.bodyWithLocale.custom((value, {req}) => {
            if (value !== req.body[fieldToCompare]) {
                throw new Error(StringUtil.capitalize(this.field) + " and " + fieldToCompare + " do not match");
            }
            return true;
        }).bail();

        return this;
    }

    unique (sequelizeModel, field) {
        this.bodyWithLocale = this.bodyWithLocale.custom(async (value) => {
            const recordExist = await sequelizeModel.findOne({
                where: {
                    [field]:value
                }
            })

            if (recordExist) {
                throw new Error(StringUtil.capitalize(this.field) + " must be unique")
            }
        }).bail();

        return this;
    }

    get() {
        return this.bodyWithLocale
    }

}

module.exports = BodyWithLocale