const express = require('express');
const eventEquipController = require('../controllers/eventEquipController');
const router = express.Router();


router.post('/', eventEquipController.addEventEquip);
router.get('/:idModelName/:idWarehouse/:qty', eventEquipController.selectFixturesByID);


module.exports = router;