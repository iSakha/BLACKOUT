const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();


// Events queries
// =====================================================================
router.get('/', eventController.getAll);
router.get('/history', eventController.getAllHistory);
// router.get('/:id', eventController.getOne);
router.get('/history/:id', eventController.getOneHistory);
router.post('/', eventController.createNewEvent);
router.delete('/:id', eventController.deleteEvent);
router.put('/:id', eventController.updateEvent);
router.get('/summary', eventController.getSummary);

module.exports = router;