const factory = require('./handlersFactory');
const MemberForm = require('../models/memberFormModel');

// @desc   Create New Member
// @route  PUT /api/v1/member
// @access Public
exports.createForm = factory.createOne(MemberForm);

// @desc   Get all members
// @route  PUT /api/v1/member
// @access Private/admin
exports.getForms = factory.getAll(MemberForm);