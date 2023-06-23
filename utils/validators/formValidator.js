const slugify = require('slugify');
const { check, body } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Form = require('../../models/formModel');


exports.createFormValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 9 })
        .withMessage('Too short name')
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),


    check('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone(['ar-EG'])
        .withMessage('invalid phone number, accept Egyptian phone numbers only'),

    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) => {
            Form.findOne({ email: val }).then((found) => {
                if (found) {
                    return Promise.reject(new Error('E-mail is in use'));
                }
            })
        }),

    check('university')
        .notEmpty()
        .withMessage('university is required')
        .isLength({ min: 2 })
        .withMessage('Too short name'),

    check('faculty')
        .notEmpty()
        .withMessage('faculty is required')
        .isLength({ min: 2 })
        .withMessage('Too short faculty name'),

    check('faculty')
        .notEmpty()
        .withMessage('deparment is required')
        .isLength({ min: 2 })
        .withMessage('Too short department name'),

    check('graduationYear')
        .notEmpty()
        .withMessage('graduationYear is required'),

    validatorMiddleware,
];