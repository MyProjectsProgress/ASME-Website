const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const {
    createEventValidator,
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
    uploadImage
} = require('../controllers/eventController');

const router = express.Router();

router.route('/')
    .get(getEvents)
    .post(protect, allowedTo('admin'), uploadImage, eventImageProcessing, createEventValidator, createEvent);

router.route('/:id')
    .get(protect, allowedTo('admin'), getEventValidator, getEvent)
    .put(protect, allowedTo('admin'), uploadImage, eventImageProcessing, updateEventValidator, updateEvent)
    .delete(protect, allowedTo('admin'), deleteEventValidator, deleteEvent);

module.exports = router;