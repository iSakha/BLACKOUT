const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();


router.post('/bookedmodels', bookingController.setBookedModels);




module.exports = router;