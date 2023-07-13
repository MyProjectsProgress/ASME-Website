const factory = require('./handlersFactory');

const Form = require('../models/formModel');

// @desc   Create New Participant
// @route  PUT /api/v1/member
// @access Public
exports.createForm = factory.createOne(Form);

// @desc   Get all participants
// @route  PUT /api/v1/member
// @access Private/admin
exports.getForms = factory.getAll(Form);