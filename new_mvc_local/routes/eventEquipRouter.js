const express = require('express');
const eventEquipController = require('../controllers/eventEquipController');
const router = express.Router();


router.post('/', eventEquipController.addEventEquip);


module.exports = router;