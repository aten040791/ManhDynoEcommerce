const { ExpressValidator } = require('express-validator');
const response = require('services/response');

const { validationResult } = new ExpressValidator({}, {}, {
    errorFormatter: error => ({
        field: error.path,
        message: error.msg
    })
});


const validate = validations => {
    return async (req, res, next) => {
        for (let validation of validations) {
            for (let _validation of validation) {
                await _validation.run(req);
            }
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        return response.invalidated(res, errors.array())
    };
};


module.exports = {validate}