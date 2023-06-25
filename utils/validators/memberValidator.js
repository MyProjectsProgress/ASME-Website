const { check, body } = require('express-validator');
const slugify = require('slugify');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Member = require('../../models/memberModel');


exports.createMemberValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name should be between 9 and 40 characters')
        .isLength({ min: 9 })
        .withMessage('Too short name')
        .isLength({ max: 40 })
        .withMessage('Name should be between 9 and 40 characters'),

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
            return Member.findOne({ email: val }).then((found) => {
                if (found) {
                    return Promise.reject(new Error('Email is in use'));
                }
            })
        }),

    check('role').optional(),

    check('image')
        .notEmpty()
        .withMessage('Image is required'),

    validatorMiddleware,
];

exports.getMemberValidator = [
    check('id')
        .isMongoId()
        .withMessage("Invalid member ID format"),

    validatorMiddleware,
];

exports.updateMemberValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid member ID format'),

    body('name')
        .optional()
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('phoneNumber')
        .optional()
        .isMobilePhone(['ar-EG'])
        .withMessage('invalid phone number, accept Egyptian phone numbers only'),

    check('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) => {
            return Member.findOne({ email: val }).then((found) => {
                if (found) {
                    return Promise.reject(new Error('Email is in use'));
                }
            })
        }),

    validatorMiddleware,
];

exports.deleteMemeberValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Category ID Format'),

    validatorMiddleware,
];