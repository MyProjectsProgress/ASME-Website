const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const { createForm, getForms } = require('../controllers/formController');

const { createFormValidator } = require('../utils/validators/formValidator');

const router = express.Router();

router.route('/')
    .get(protect, allowedTo('admin'), getForms)
    .post(createFormValidator, createForm);

module.exports = router;