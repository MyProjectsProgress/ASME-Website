const multer = require('multer');
const ApiError = require('../utils/apiError');

const multerOptions = () => {

    const multerStorage = multer.memoryStorage();

    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new ApiError('Only Images Allowed', 400), false);
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload;
};

// Create a shared Multer instance
const upload = multerOptions();

exports.uploadSingleImage = (fieldName) => {
    return upload.single(fieldName);
};

exports.uploadMultipleImages = (arrayOfFields) => {
    return upload.fields(arrayOfFields);
};