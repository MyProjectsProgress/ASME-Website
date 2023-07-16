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

router.use(protect, allowedTo('admin'));

router.route('/')
    .get(getWorkshops)
    .post(uploadImage, workshopImageProcessing, createWorkshopValidator, createWorkshop);

router.route('/:id')
    .get(getWorkshopValidator, getWorkshop)
    .put(uploadImage, workshopImageProcessing, updateWorkshopValidator, updateWorkshop)
    .delete(deleteWorkshopValidator, deleteWorkshop);

module.exports = router;