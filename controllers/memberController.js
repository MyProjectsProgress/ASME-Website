const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const factory = require('./handlersFactory');
const { uploadImage } = require('../middlewares/uploadImageMiddleware');

const Member = require('../models/memberModel');

exports.uploadImage = uploadImage('image');

// @desc   Apply some changes on uploaded picture
exports.imageProcessing = asyncHandler(async (req, res, next) => {

    if (req.file) {
        const randomID = uuidv4();
        req.body.slug = slugify(req.body.name);
        const filename = `${req.body.slug}-${randomID}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(600, 600)
            .withMetadata()
            .toFormat('jpeg')
            .jpeg({ quality: 99 })
            .toFile(`uploads/members/${filename}`);

        // saving the url in database not only the image name
        const imageURL = `${process.env.BASE_URL}/members/${filename}`;
        req.body.image = imageURL;
    }

    next();
});

// @desc   Create New Member
// @route  POST /api/v1/member
// @access Private
exports.createMember = factory.createOne(Member);

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
