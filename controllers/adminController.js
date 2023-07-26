const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const factory = require('./handlersFactory');
const { createToken } = require('../utils/helperFunctions');
const Admin = require('../models/adminModel');

// @desc   Create New Admin
// @route  GET /api/v1/auth/createAdmin
// @access Private
exports.createAdmin = asyncHandler(async (req, res, next) => {
    // 1- Create Admin
    const admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        // passowrd will be hashed in adminModel.js
        password: req.body.password,
        role: req.body.role,
    });

    // 2- Generate Json Web Token
    // token consists of three parts: headers, data, security checl jwt.io
    const token = await createToken(admin._id);

    res.status(201).json({ data: admin, token });
});

// @desc   Get Specific Admin
// @route  GET /api/v1/admin
// @access Private
exports.getAdmin = factory.getOne(Admin);

// @desc   Get All Admins
// @route  GET /api/v1/admin
// @access Private
exports.getAdmins = factory.getAll(Admin);

// @desc   Update Admins' Email
// @route  PUT /api/v1/admin
// @access Private
exports.updateAdmin = asyncHandler(async (req, res, next) => {

    // updating email but not password
    const document = await Admin.findByIdAndUpdate(req.params.id,
        {
            email: req.body.email,
            role: req.body.role,
        },
        { new: true });

    if (!document) {
        return next(new ApiError(`No document for this ID: ${id}`, 404));
    }

    res.status(200).json({ data: document });
});

// @desc   Update Admins' Password
// @route  PUT /api/v1/admin
// @access Private
exports.changeAdminPassword = asyncHandler(async (req, res, next) => {

    // updating password
    const document = await Admin.findByIdAndUpdate(req.params.id,
        {
            password: await bcrypt.hash(req.body.password, 12),
            passwordChangedAt: Date.now(),
        },
        { new: true });

    if (!document) {
        return next(new ApiError(`No document for this ID: ${id}`, 404));
    }

    res.status(200).json({ data: document });
});

// @desc   Delete Admins' Data
// @route  DELETE /api/v1/admin
// @access Private
exports.deleteAdmin = factory.deleteOne(Admin);

// @desc   Delete All Admins
// @route  DELETE /api/v1/admin
// @access Private
exports.deleteAll = asyncHandler(async (req, res, next) => {
    await Admin.deleteMany({});
    res.json({ message: 'All admins have been deleted.' });
});

