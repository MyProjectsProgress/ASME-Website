const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const { createForm, getForms } = require('../controllers/memberFormController');

const { createFormValidator } = require('../utils/validators/memberFormValidator');

const router = express.Router();

router.route('/')
    // .get(protect, allowedTo('admin'), getForms)
    // .get(getForms)
    .post(createFormValidator, createForm);

module.exports = router;