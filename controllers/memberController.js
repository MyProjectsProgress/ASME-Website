const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const multiparty = require('multiparty');

const factory = require('./handlersFactory');

const Member = require('../models/memberModel');

async function processAndSaveImage(imageFile, req) {

    const randomID = uuidv4();
    const filename = `${req.body.slug}-${randomID}-${Date.now()}.jpeg`;

    if (imageFile.fieldName === 'image') {
        await sharp(imageFile.path)
            .withMetadata()
            .toFormat('jpeg')
            .jpeg({ quality: 99 })
            .toFile(`uploads/members/${filename}`);
    }

    return filename;
};


async function processImages(req, res) {
    try {
        const image = req.body.image;

        const imageFileName = await processAndSaveImage(image, req);

        const imageURL = `${process.env.BASE_URL}/members/${imageFileName}`;
        req.body.image = imageURL;

        const document = await Member.create(req.body);
        res.status(201).json({ data: document });

    } catch (error) {
        console.error('Image processing error:', error.message);
    }
};

// @desc   Create New Member
// @route  POST /api/v1/member
// @access Private
exports.createMember = asyncHandler(async (req, res) => {

    let form = new multiparty.Form();

    form.parse(req, async function (err, fields, files) {

        if (err) {
            return res.status(500).json({ error: 'Error parsing form data' });
        }

        const { name, phoneNumber, email, role } = fields;
        const { image: imageFile } = files;

        req.body.name = name[0];
        req.body.slug = slugify(req.body.name);
        req.body.phoneNumber = phoneNumber[0];
        req.body.email = email[0]
        req.body.role = role[0];;
        req.body.image = imageFile[0];

        processImages(req, res);
    });
});

// @desc   Get Specific Member
// @route  GET /api/v1/member
// @access Private
exports.getMember = factory.getOne(Member);

// @desc   Get All Members
// @route  GET /api/v1/member
// @access Private
exports.getMembers = factory.getAll(Member);

// @desc   Update Members' Data
// @route  PUT /api/v1/member
// @access Private
exports.updateMember = factory.updateOne(Member);

// @desc   Delete Members' Data
// @route  DELETE /api/v1/member
// @access Private
exports.deleteMember = factory.deleteOne(Member);

// @desc   Delete All Members
// @route  DELETE /api/v1/member
// @access Private
exports.deleteAll = asyncHandler(async (req, res, next) => {
    await Member.deleteMany({});
    res.json({ message: 'All members have been deleted.' });
});
