const express = require('express');
const equipController = require('../controllers/equipController');
const router = express.Router();

// Get all departments
// =====================================================================
router.get('/deps', equipController.getDepartments);

// Get all categories
// =====================================================================
router.get('/cats', equipController.getCategories);

// Get categories by department
// =====================================================================
router.get('/deps/cats/:id', equipController.getCategoriesByDep);

// Get equipment by department
// =====================================================================
router.get('/deps/:id', equipController.getEquipmentByDep);

// Get equipment by department and category
// =====================================================================
router.get('/deps/:idDep/cats/:idCat', equipController.getEquipmentByDepCat);

// Get fixtures by department, category and name
// =====================================================================
router.get('/deps/:idDep/cats/:idCat/name/:idName', equipController.getFixtureByDepCatName);

// Get fixtures by modelName
// =====================================================================
router.get('/fixt/:id', equipController.getFixturesByModelName);

// Get qty fixtures by id
// =====================================================================
router.get('/qty/:id', equipController.getQtyById);

// Set fixture status
// =====================================================================
router.post('/fixturelife/:status', equipController.changeStatusById);

// Get fixtures history
// =====================================================================
router.get('/history', equipController.getFixtureHistory);

// Get fixtures history by id
// =====================================================================
router.get('/history/:id', equipController.getFixtureHistoryByID);

// Fixtures movement
// =====================================================================
router.post('/movement', equipController.fixturesMovement);

// Get all models
// =====================================================================
router.get('/allmodels', equipController.getAllModels);

// Get fixtures by model
// =====================================================================
router.get('/allmodels/:id', equipController.getOneModel);




module.exports = router;