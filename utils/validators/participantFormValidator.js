const { check, body } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const ParticipantForm = require('../../models/participantFormModel');

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
        .custom(async (val) => {
            return ParticipantForm.findOne({ email: val }).then((found) => {
                if (found) {
                    return Promise.reject(new Error('Email is in use'));
                }
            })
        }),

    check('university')
        .notEmpty()
        .withMessage('University is required')
        .isLength({ min: 2 })
        .withMessage('Invalid university name')
        .isLength({ max: 40 })
        .withMessage('Invalid university name'),

    check('faculty')
        .notEmpty()
        .withMessage('Faculty is required')
        .isLength({ min: 2 })
        .withMessage('Invaid faculty name')
        .isLength({ max: 40 })
        .withMessage('Invalid faculty name'),

    check('department')
        .notEmpty()
        .withMessage('Dept. is required')
        .isLength({ min: 2 })
        .withMessage('Invalid Dept. name')
        .isLength({ max: 40 })
        .withMessage('Invalid Dept. name'),

    check('graduationYear')
        .notEmpty()
        .withMessage('Select a grad year'),

    validatorMiddleware,
];