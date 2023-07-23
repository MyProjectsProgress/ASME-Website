const express = require('express');

const { protect, allowedTo } = require('../controllers/authController');

const {
    createWorkshopValidator,
    deleteWorkshopValidator,
    getWorkshopValidator,
    updateWorkshopValidator
} = require('../utils/validators/workshopValidator');

const {
    createWorkshop,
    updateWorkshop,
    getWorkshops,
    getWorkshop,
    deleteWorkshop,
    workshopImageProcessing,
    uploadImage
} = require('../controllers/workshopController');

const router = express.Router();

router.route('/')
    .get(getWorkshops)
    .post(protect, allowedTo('admin'), createWorkshop);

// router.route('/:id')
//     .get(protect, allowedTo('admin'), getWorkshopValidator, getWorkshop)
//     .put(protect, allowedTo('admin'), uploadImage, workshopImageProcessing, updateWorkshopValidator, updateWorkshop)
//     .delete(protect, allowedTo('admin'), deleteWorkshopValidator, deleteWorkshop);

module.exports = router;