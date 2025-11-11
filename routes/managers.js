const express = require('express');
const router = express.Router();
const managersController = require('../controllers/managers');

router.get('/', managersController.getAllManagers);
router.get('/:id', managersController.getManagerById);
router.post('/', managersController.createManager);

module.exports = router;
