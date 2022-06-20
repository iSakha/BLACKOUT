const express = require('express');
const rootController = require('../controllers/rootController');
const router = express.Router();


router.get('/', rootController.greetMessage);
router.get('/checkdb', rootController.checkDbConnection);

// GET
// =====================================================================
router.get('/locations', rootController.getLocations);
router.get('/clients', rootController.getClients);
router.get('/users', rootController.getManagers);
router.get('/status', rootController.getStatus);
router.post('/status', rootController.addStatus);
router.get('/phase', rootController.getPhases);
router.get('/warehouses', rootController.getWarehouses);

// CREATE
// =====================================================================
router.post('/locations', rootController.newCity);

// UPDATE
// =====================================================================

// DELETE
// =====================================================================


module.exports = router;