const express = require('express');

const { createForm } = require('../controllers/formController');

const { createFormValidator } = require('../utils/validators/formValidator');

const router = express.Router();

router.route('/').post(createFormValidator, createForm);

module.exports = router;