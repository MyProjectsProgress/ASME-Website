const factory = require('./handlersFactory');

const ParticipantForm = require('../models/participantFormModel');

// @desc   Create New Participant
// @route  PUT /api/v1/member
// @access Public
exports.createForm = factory.createOne(ParticipantForm);

// @desc   Get all participants
// @route  PUT /api/v1/member
// @access Private/admin
exports.getForms = factory.getAll(ParticipantForm);