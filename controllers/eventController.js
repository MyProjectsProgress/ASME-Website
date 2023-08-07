const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const multiparty = require('multiparty');

const factory = require('./handlersFactory');
const Event = require('../models/eventModel');

async function processAndSaveImage(imageFile, req) {
    try {
        const randomID = uuidv4();
        const filename = `${req.body.slug}-${randomID}-${Date.now()}.jpeg`;

        if (imageFile.fieldName === 'backgroundImage') {
            await sharp(imageFile.path)
                .withMetadata()
                .toFormat('jpeg')
                .jpeg({ quality: 99 })
                .toFile(`uploads/backgroundImage/${filename}`);

        } else if (imageFile.fieldName === 'foregroundImage') {
            await sharp(imageFile.path)
                .withMetadata()
                .toFormat('jpeg')
                .jpeg({ quality: 99 })
                .toFile(`uploads/foregroundImage/${filename}`);
        };

        return filename;
    } catch (error) {
        console.error('Image processing error:', error);
    }
};


async function processImages(req, res) {
    try {
        const backgroundImage = req.body.backgroundImage;
        const foregroundImage = req.body.foregroundImage;

        // Process the background image
        const bgFileName = await processAndSaveImage(backgroundImage, req);

        const imageURL1 = `${process.env.BASE_URL}/backgroundImage/${bgFileName}`;
        req.body.backgroundImage = imageURL1;

        // Process the foreground image
        const fgFileName = await processAndSaveImage(foregroundImage, req);
        const imageURL2 = `${process.env.BASE_URL}/foregroundImage/${fgFileName}`;
        req.body.foregroundImage = imageURL2;

        const document = await Event.create(req.body);
        res.status(201).json({ data: document });
    } catch (error) {
        console.error('Image processing error:', error);
    }
};

// @desc   Create New Event
// @route  PUT /api/v1/event
// @access Private/admin
exports.createEvent = asyncHandler(async (req, res) => {

    let form = new multiparty.Form();

    form.parse(req, async function (err, fields, files) {

        if (err) {
            return res.status(500).json({ error: 'Error parsing form data' });
        }

        const { title, description, date, backgroundImage, foregroundImage, expired } = fields;
        const { backgroundImage: bgImageFile, foregroundImage: fgImageFile } = files;

        req.body.title = title[0];
        req.body.slug = slugify(req.body.title);
        req.body.description = description[0];
        req.body.date = date[0];
        req.body.backgroundImage = bgImageFile[0];
        req.body.foregroundImage = fgImageFile[0];
        req.body.expired = expired[0];

        await processImages(req, res);
    });
});

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