const { check, body } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const MemberForm = require('../../models/memberFormModel');


exports.createFormValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name should be between 9 - 40 characters')
        .isLength({ min: 9 })
        .withMessage('Name should be between 9 - 40 characters')
        .isLength({ max: 40 })
        .withMessage('Name should be between 9 - 40 characters'),

    check('phoneNumber')
        .notEmpty()
        .withMessage('Please, enter a valid Egyptian phone number')
        .isMobilePhone(['ar-EG'])
        .withMessage('Please, enter a valid Egyptian phone number'),

    check('email')
        .notEmpty()
        .withMessage('Invalid email address')
        .isEmail()
        .withMessage('Invalid email address')
        .custom(async (val) => {
            return MemberForm.findOne({ email: val }).then((found) => {
                if (found) {
                    return Promise.reject(new Error('Email is in use'));
                }
            })
        }),

    check('university')
        .notEmpty()
        .withMessage('University is required'),

    check('faculty')
        .notEmpty()
        .withMessage('Faculty is required'),

    check('department')
        .notEmpty()
        .withMessage('Dept is required'),

    check('graduationYear')
        .notEmpty()
        .withMessage('Select a grad year'),

    check('position')
        .notEmpty()
        .withMessage('Position is required'),

    validatorMiddleware,
];