const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();


// Events queries
// =====================================================================
router.get('/', eventController.getAll);
router.get('/latest', eventController.getAllLatest);
router.get('/id/:id', eventController.getOne);
router.get('/history/id/:id', eventController.getOneHistory);
router.post('/', eventController.createNewEvent);
router.put('/id/:id', eventController.updateEvent);

// Extra queries
// =====================================================================

// GET
// =====================================================================
router.get('/locations', eventController.getLocations);
router.get('/clients', eventController.getClients);
router.get('/users', eventController.getManagers);
router.get('/status', eventController.getStatus);
router.get('/phase', eventController.getPhases);
router.get('/summary', eventController.getSummary);
router.get('/warehouses', eventController.getWarehouses);


// CREATE
// =====================================================================
router.post('/locations', eventController.newCity);

// UPDATE
// =====================================================================

// DELETE
// =====================================================================

module.exports = router;