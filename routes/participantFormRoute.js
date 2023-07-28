const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const { createForm, getForms } = require('../controllers/participantFormController');

const { createFormValidator } = require('../utils/validators/participantFormValidator');

const router = express.Router();

router.route('/')
    // .get(protect, allowedTo('admin'), getForms)
    // .get(getForms)
    .post(createFormValidator, createForm);

module.exports = router;