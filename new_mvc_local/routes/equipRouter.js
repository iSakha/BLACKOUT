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

// Get fixtures by id
// =====================================================================
router.get('/fixt/:id', equipController.getFixtureByID);





module.exports = router;