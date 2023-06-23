const asyncHandler = require('express-async-handler');


// @desc   Create form
// @route  POST /api/v1/form
// @access Public
exports.createOne = (Model) => asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
});

