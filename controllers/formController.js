const factory = require('./handlersFactory');

const Form = require('../models/formModel');

exports.createForm = factory.createOne(Form);