const { check, body } = require('express-validator');
const slugify = require('slugify');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createWorkshopValidator = [
    check('title')
        .notEmpty()
        .withMessage('Workshop title is required')
        .custom(async (val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('description')
        .notEmpty()
        .withMessage('Description is required'),

    check('image')
        .notEmpty()
        .withMessage('Image is required'),

    validatorMiddleware,
];

exports.updateWorkshopValidator = [
    check('title')
        .optional()
        .custom(async (val, { req }) => {
            req.body.slug = slugify(val);
            return true;
        }),

    validatorMiddleware,
];

exports.deleteWorkshopValidator = [
    check('id')
        .isMongoId()
        .withMessage('Invalid workshop ID Format'),

    validatorMiddleware,
];

exports.getWorkshopValidator = [
    check('id')
        .isMongoId()
        .withMessage("Invalid workshop ID format"),

    validatorMiddleware,
];