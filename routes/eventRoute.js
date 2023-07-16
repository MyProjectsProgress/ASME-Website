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

router.use(protect, allowedTo('admin'));

router.route('/')
    .get(getEvents)
    .post(uploadImage, eventImageProcessing, createEventValidator, createEvent);

router.route('/:id')
    .get(getEventValidator, getEvent)
    .put(uploadImage, eventImageProcessing, updateEventValidator, updateEvent)
    .delete(deleteEventValidator, deleteEvent);

module.exports = router;