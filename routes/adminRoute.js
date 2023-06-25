const express = require('express');

const router = express.Router();

const {
    createMemberValidator,
    getMemberValidator,
    updateMemberValidator,
    deleteMemeberValidator
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
    .delete(deleteMemeberValidator, deleteMember)

module.exports = router;