const { check, body } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Form = require('../../models/formModel');


exports.createFormValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 9 })
        .withMessage('Name should be between 9 and 40 characters')
        .isLength({ max: 40 })
        .withMessage('Name should be between 9 and 40 characters'),

    check('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone(['ar-EG'])
        .withMessage('Invalid phone number, accept Egyptian phone numbers only'),

    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) => {
            return Form.findOne({ email: val }).then((found) => {
                if (found) {
                    return Promise.reject(new Error('Email is in use'));
                }
            })
        }),

    check('university')
        .notEmpty()
        .withMessage('University is required')
        .isLength({ min: 2 })
        .withMessage('University name should be between 2 and 40 characters')
        .isLength({ max: 40 })
        .withMessage('University name should be between 2 and 40 characters'),

    check('faculty')
        .notEmpty()
        .withMessage('Faculty is required')
        .isLength({ min: 2 })
        .withMessage('Faculty name should be between 2 and 40 characters')
        .isLength({ max: 40 })
        .withMessage('Faculty name should be between 2 and 40 characters'),

    check('department')
        .notEmpty()
        .withMessage('Deparment is required')
        .isLength({ min: 2 })
        .withMessage('Department name should be between 2 and 40 characters')
        .isLength({ max: 40 })
        .withMessage('Department name should be between 2 and 40 characters'),

    check('graduationYear')
        .notEmpty()
        .withMessage('Graduation year is required'),

    validatorMiddleware,
];