const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const {
    createEventValidator,
    // saveDocument,
    deleteEventValidator,
    getEventValidator,
    updateEventValidator
} = require('../utils/validators/eventValidator');

const {
    createEvent,
    updateEvent,
    getEvents,
    getEvent,
    deleteEvent,
    eventImageProcessing,
    uploadImages
} = require('../controllers/eventController');

const router = express.Router();

router.route('/')
    .get(getEvents)
    .post(protect, allowedTo('admin'), createEvent);

// router.route('/:id')
//     .get(protect, allowedTo('admin'), getEventValidator, getEvent)
//     .put(protect, allowedTo('admin'), uploadImages, eventImageProcessing, updateEventValidator, updateEvent)
//     .delete(protect, allowedTo('admin'), deleteEventValidator, deleteEvent);

module.exports = router;