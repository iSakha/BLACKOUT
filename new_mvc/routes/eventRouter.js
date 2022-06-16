const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();


// Events queries
// =====================================================================
router.get('/history', eventController.getAllHistory);
router.get('/', eventController.getAll);
router.get('/id/:id', eventController.getOne);
router.get('/history/id/:id', eventController.getOneHistory);
router.post('/', eventController.createNewEvent);
router.put('/id/:id', eventController.updateEvent);
router.get('/summary', eventController.getSummary);

module.exports = router;