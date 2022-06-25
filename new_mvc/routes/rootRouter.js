const express = require('express');
const rootController = require('../controllers/rootController');
const router = express.Router();


router.get('/', rootController.greetMessage);
router.get('/checkdb', rootController.checkDbConnection);

// CLIENTS
// =====================================================================
router.get('/clients', rootController.getClients);
router.get('/clients/:id', rootController.getOneClient);


router.get('/locations', rootController.getLocations);

router.get('/users', rootController.getUsers);
router.get('/user', rootController.getUser);
router.get('/status', rootController.getStatus);
router.post('/status', rootController.addStatus);
router.get('/phase', rootController.getPhases);
router.get('/warehouses', rootController.getWarehouses);

// CREATE
// =====================================================================
router.post('/locations', rootController.newCity);
router.post('/clients', rootController.addClient);
// UPDATE
// =====================================================================
router.put('/clients/:id', rootController.updateClient);

// DELETE
// =====================================================================


module.exports = router;