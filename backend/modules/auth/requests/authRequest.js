const { body } = require('express-validator');

const email = body('email')
    .isEmail().withMessage('Email is not a valid pattern example214@gmail.com');

const password = body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long');

const confirmPassword = body('confirmPassword')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password and confirm password do not match');
        }
        return true;
    });

module.exports = [
    email,
    password,
    confirmPassword
]