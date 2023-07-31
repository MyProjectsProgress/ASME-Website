const { check, body } = require('express-validator');
const slugify = require('slugify');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createEventValidator = [
    check('title')
        .notEmpty()
        .withMessage('Event title is required'),
    // .custom(async (val, { req }) => {
    //     req.body.slug = slugify(val);
    //     return true;
    // }),

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

    check('foregroundImage')
        .notEmpty()
        .withMessage('Foreground image is required'),

    validatorMiddleware,
];

exports.updateEventValidator = [
    check('title')
        .optional()
        .custom(async (val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('date')
        .optional()
        .isDate()
        .withMessage('Invalid date format'),

    validatorMiddleware,
];

exports.deleteEventValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid Event ID Format'),

    validatorMiddleware,
];

exports.getEventValidator = [
    check('id')
        .isMongoId()
        .withMessage("Invalid event ID format"),

    validatorMiddleware,
];