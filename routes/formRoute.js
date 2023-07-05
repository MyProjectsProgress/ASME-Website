const express = require('express');

const { createForm, getForms } = require('../controllers/formController');

const { createFormValidator } = require('../utils/validators/formValidator');


const router = express.Router();

router.route('/')
    .get(getForms)
    .post(createFormValidator, createForm);

module.exports = router;