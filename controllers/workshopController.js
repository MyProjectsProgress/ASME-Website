const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const multiparty = require('multiparty');

const factory = require('./handlersFactory');
const Workshop = require('../models/workshopModel');

async function processAndSaveImage(imageFile, req) {
    try {
        const randomID = uuidv4();
        const filename = `${req.body.slug}-${randomID}-${Date.now()}.jpeg`;

        if (imageFile.fieldName === 'workshopImage') {
            await sharp(imageFile.path)
                .withMetadata()
                .toFormat('jpeg')
                .jpeg({ quality: 99 })
                .toFile(`uploads/workshops/${filename}`);
        }

        return filename;
    } catch (error) {
        console.error('Image processing error:', error);
    }
};

async function processImages(req, res) {
    try {
        const image = req.body.image;

        const imageFileName = await processAndSaveImage(image, req);

        const imageURL = `${process.env.BASE_URL}/workshops/${imageFileName}`;
        req.body.image = imageURL;

        const document = await Workshop.create(req.body);
        res.status(201).json({ data: document });
    } catch (error) {
        console.error('Image processing error:', error);
    }
};

// @desc   Create New Workshop
// @route  PUT /api/v1/workshop
// @access Private/admin
exports.createWorkshop = asyncHandler(async (req, res) => {

    let form = new multiparty.Form();

    form.parse(req, async function (err, fields, files) {

        if (err) {
            return res.status(500).json({ error: 'Error parsing form data' });
        }

        const { title, description } = fields;

        req.body.title = title[0];
        req.body.slug = slugify(req.body.title);
        req.body.description = description[0];
        req.body.image = files.workshopImage[0];

        await processImages(req, res);
    });
});

// @desc   Get All Workshops
// @route  PUT /api/v1/workshop
// @access Private/admin
exports.getWorkshops = factory.getAll(Workshop);

// @desc   Get Specific Workshop
// @route  GET /api/v1/workshop
// @access Private
exports.getWorkshop = factory.getOne(Workshop);

// @desc   Update Workshop's Data
// @route  PUT /api/v1/workshop
// @access Private/admin
exports.updateWorkshop = factory.updateOne(Workshop);

// @desc   Delete Workshop' Data
// @route  DELETE /api/v1/workshop
// @access Private/admin
exports.deleteWorkshop = factory.deleteOne(Workshop);