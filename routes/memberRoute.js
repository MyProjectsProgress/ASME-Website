const express = require('express');

const router = express.Router();

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

router.route('/')
    .get(getMembers)
    .post(uploadImage, imageProcessing, createMemberValidator, createMember)
    .delete(deleteAll)

router.route('/:id')
    .get(getMemberValidator, getMember)
    .put(uploadImage, imageProcessing, updateMemberValidator, updateMember)
    .delete(deleteMemberValidator, deleteMember)

module.exports = router;