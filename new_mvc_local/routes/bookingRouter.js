const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();


router.post('/bookedmodels', bookingController.setBookedModels);
router.get('/bookedmodels/:id', bookingController.getBookedModelsByEventID);




module.exports = router;