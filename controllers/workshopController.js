const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const factory = require('./handlersFactory');
const { uploadImage } = require('../middlewares/uploadImageMiddleware');

const Workshop = require('../models/workshopModel');

// exports.uploadImage = uploadImage('image');

// @desc   Apply some changes on uploaded picture
// exports.workshopImageProcessing = asyncHandler(async (req, res, next) => {

//     console.log(req.file)

//     if (req.file) {

//         const randomID = uuidv4();

//         if (req.body.title) {
//             req.body.slug = slugify(req.body.title);
//         } else {
//             let query = Workshop.findById(req.params.id);
//             const document = await query;
//             req.body.slug = document.slug;
//         }

//         const filename = `${req.body.slug}-${randomID}-${Date.now()}.jpeg`;

//         await sharp(req.file.buffer)
//             .resize(600, 600)
//             .withMetadata()
//             .toFormat('jpeg')
//             .jpeg({ quality: 99 })
//             .toFile(`uploads/workshops/${filename}`);

//         // saving the url in database not only the image name
//         const imageURL = `${process.env.BASE_URL}/workshops/${filename}`;
//         req.body.backgroundImage = imageURL;
//     }

//     next();
// });

// @desc   Create New Participant
// @route  PUT /api/v1/workshop
// @access Private/admin
exports.createWorkshop = factory.createOne(Workshop);

// @desc   Get All Participants
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