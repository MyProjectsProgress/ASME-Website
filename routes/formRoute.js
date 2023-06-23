const express = require('express');

const router = express.Router();

const { createForm } = require('../controllers/formController');

const { createFormValidator } = require('../utils/validators/formValidator');

router.route('/').post(createFormValidator, createForm);

module.exports = router;