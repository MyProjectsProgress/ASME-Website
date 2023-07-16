const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const factory = require('./handlersFactory');
const { uploadImage } = require('../middlewares/uploadImageMiddleware');

const Event = require('../models/eventModel');

exports.uploadImage = uploadImage('backgroundImage');

// exports.uploadImage = uploadImage('foregroundImage');

// @desc   Apply some changes on uploaded picture
exports.eventImageProcessing = asyncHandler(async (req, res, next) => {

    if (req.file) {

        const randomID = uuidv4();

        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        } else {
            let query = Event.findById(req.params.id);
            const document = await query;
            req.body.slug = document.slug;
        }

        const filename = `${req.body.slug}-${randomID}-${Date.now()}.jpeg`;

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
// @route  PUT /api/v1/event
// @access Private/admin
exports.createEvent = factory.createOne(Event);

// @desc   Get All Participants
// @route  PUT /api/v1/event
// @access Private/admin
exports.getEvents = factory.getAll(Event);

// @desc   Get Specific Event
// @route  GET /api/v1/event
// @access Private
exports.getEvent = factory.getOne(Event);

// @desc   Update Event's Data
// @route  PUT /api/v1/event
// @access Private/admin
exports.updateEvent = factory.updateOne(Event);

// @desc   Delete Event' Data
// @route  DELETE /api/v1/event
// @access Private/admin
exports.deleteEvent = factory.deleteOne(Event);