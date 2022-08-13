const express = require('express');
const testController = require('../controllers/testController');
const router = express.Router();

router.get('/1', testController.test_1);
router.post('/2', testController.test_2);
router.get('/3/:id', testController.test_3);


module.exports = router;