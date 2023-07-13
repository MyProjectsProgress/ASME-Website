const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const { createEvent, getEvents, imageProcessing, uploadImage } = require('../controllers/eventController');

const { createEventValidator } = require('../utils/validators/eventValidator');

const router = express.Router();

router.route('/')
    .get(protect, allowedTo('admin'), getEvents)
    .post(createEventValidator, uploadImage, imageProcessing, createEvent);

module.exports = router;