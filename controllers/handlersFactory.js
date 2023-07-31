const asyncHandler = require('express-async-handler');

const ApiFeatures = require('../utils/apiFeatures');

// @desc   Delete Model
// @route  PUT /api/v1/model/:id
// @access Private
exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {

    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
        return next(new ApiError(`No document for this ID: ${req.params.id}`, 404));
    }
    res.status(204).send();
});

// @desc   Update Model
// @route  PUT /api/v1/model/:id
// @access Private
exports.updateOne = (Model) => asyncHandler(async (req, res, next) => {

    const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!document) {
        return next(new ApiError(`No document for this ID: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
});

// @desc   Create form
// @route  POST /api/v1/form
// @access Public
exports.createOne = (Model) => asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
});

// @desc   Get Model By ID
// @route  GET /api/v1/models/:id
// @access Public
exports.getOne = (Model, populationOption) => asyncHandler(async (req, res, next) => {

    // build query 
    let query = Model.findById(req.params.id);

    if (!document) {
        return next(new ApiError(`No document for this ID: ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
});

// @desc   Get list of Models
// @route  GET /api/v1/models
// @access Public
exports.getAll = (Model, modelName = '') => asyncHandler(async (req, res) => {

    let filter = {};
    if (req.filterObj) {
        filter = req.filterObj;
    }

    // we create object then apply the chained features on it.
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
        .filter()
        .search(modelName)
        .limitFields()
        .sort();

    // Excute Query
    const { mongooseQuery } = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json({ results: documents.length, data: documents });
});
