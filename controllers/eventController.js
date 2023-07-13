const asyncHandler = require('express-async-handler');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');

const factory = require('./handlersFactory');
const { uploadImage } = require('../middlewares/uploadImageMiddleware');

const Event = require('../models/eventModel');

exports.uploadImage = uploadImage();

// @desc   Apply some changes on uploaded picture
exports.imageProcessing = asyncHandler(async (req, res, next) => {

    console.log(req.body)

    if (req.file) {
        const randomID = uuidv4();
        req.body.slug = slugify(req.body.title);
        const filename = `${randomID}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(600, 600)
            .withMetadata()
            .toFormat('jpeg')
            .jpeg({ quality: 99 })
            .toFile(`uploads/events_background/${filename}`);

        // saving the url in database not only the image name
        const imageURL = `${process.env.BASE_URL}/events_background/${filename}`;
        req.body.backgroundImage = imageURL;
    }

    next();
});

// @desc   Create New Participant
// @route  PUT /api/v1/member
// @access Public
exports.createEvent = factory.createOne(Event);

// @desc   Get all participants
// @route  PUT /api/v1/member
// @access Private/admin
exports.getEvents = factory.getAll(Event);