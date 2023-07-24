const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const {
    createAdminValidator,
    getAdminValidator,
    updateAdminValidator,
    deleteAdminValidator,
    changeAdminPasswordValidator,
} = require('../utils/validators/adminValidator');

const {
    createAdmin,
    getAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    deleteAll,
    changeAdminPassword,
} = require('../controllers/adminController');

const router = express.Router();

// router.use(protect);

router.put('/changePassword/:id', changeAdminPasswordValidator, changeAdminPassword);

// router.use(allowedTo('admin'));

router.route('/')
    .get(getAdmins)
    .post(createAdminValidator, createAdmin)
    .delete(deleteAll)

router.route('/:id')
    .get(getAdminValidator, getAdmin)
    .put(updateAdminValidator, updateAdmin)
    .delete(deleteAdminValidator, deleteAdmin)

module.exports = router;