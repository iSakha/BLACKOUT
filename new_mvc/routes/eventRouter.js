const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();


router.get('/', eventController.getAllEvents);
router.post('/', eventController.createNewEvent);
router.get('/locations', eventController.getLocations);
router.get('/clients', eventController.getClients);
router.get('/users', eventController.getManagers);
router.get('/status', eventController.getStatus);

module.exports = router;