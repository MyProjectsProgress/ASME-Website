const multer = require('multer');
const ApiError = require('../utils/apiError');

// @desc    Uploading single image
exports.uploadImage = () => {

    // memory storage is used to store image as a buffer so that we could apply image processing on it
    const multerStorage = multer.memoryStorage();

    // check whether the uploaded file is image and if not so it throughs an error
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new ApiError('Only images are allowed', 400), false);
        }
    };

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload.single('image');
};