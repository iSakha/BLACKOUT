const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

console.log("Test Test Test Test");

router.get('/', eventController.getAllEvents);
router.get('/id/:id', eventController.getOne);
router.post('/', eventController.createNewEvent);
router.get('/locations', eventController.getLocations);
router.get('/clients', eventController.getClients);
router.get('/users', eventController.getManagers);
router.get('/status', eventController.getStatus);
router.get('/summary', eventController.getSummary);

module.exports = router;