const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const factory = require('./handlersFactory');
const { uploadImage } = require('../middlewares/uploadImageMiddleware');

const Member = require('../models/memberModel');

exports.uploadImage = uploadImage();

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

exports.createMember = factory.createOne(Member);

exports.getMember = factory.getOne(Member);

exports.getMembers = factory.getAll(Member);

exports.updateMember = factory.updateOne(Member);

exports.deleteMember = factory.deleteOne(Member);

exports.deleteAll = asyncHandler(async (req, res, next) => {
    await Member.deleteMany({});
    res.json({ message: 'All members have been deleted.' });
});
