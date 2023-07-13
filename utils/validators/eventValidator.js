const { check, body } = require('express-validator');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createEventValidator = [
    check('title')
        .notEmpty()
        .withMessage('Event title is required'),

    check('date')
        .notEmpty()
        .withMessage('Date is required')
        .isDate()
        .withMessage('Invalid date format'),

    check('description')
        .notEmpty()
        .withMessage('Description is required'),

    check('backgroundImage')
        .notEmpty()
        .withMessage('Background image is required'),

    validatorMiddleware,
];