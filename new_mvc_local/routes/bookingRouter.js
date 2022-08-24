const express = require('express');
const bookingController = require('../controllers/bookingController');
const router = express.Router();


router.post('/bookedmodels', bookingController.setBookedModels);
router.get('/bookedmodels/:id', bookingController.getBookedModelsByEventID);
router.delete('/bookedmodels/:id', bookingController.deleteModelsByEventID);
router.get('/all', bookingController.bookedEquipGetAll);
router.get('/events', bookingController.getEvents);
router.post('/interval', bookingController.getBookedEquipOnInterval);
router.post('/date', bookingController.getBookedEquipOnDate);

router.get('/interval', bookingController.getBookedEquipOnIntervalWh);


// Get equipment by category and time interval





module.exports = router;