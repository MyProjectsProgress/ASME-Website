const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const {
    createMemberValidator,
    getMemberValidator,
    updateMemberValidator,
    deleteMemberValidator
} = require('../utils/validators/memberValidator');

const {
    createMember,
    getMember,
    getMembers,
    updateMember,
    deleteMember,
    deleteAll,
    imageProcessing,
    uploadImage,
} = require('../controllers/memberController');

const router = express.Router();

router.route('/')
    .get(getMembers)
    .post(protect, allowedTo('admin'), createMember)
    .delete(protect, allowedTo('admin'), deleteAll)

// router.route('/:id')
//     .get(getMemberValidator, getMember)
//     .put(uploadImage, imageProcessing, updateMemberValidator, updateMember)
//     .delete(deleteMemberValidator, deleteMember)

module.exports = router;