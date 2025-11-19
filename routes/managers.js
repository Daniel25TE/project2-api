const express = require('express');
const router = express.Router();
const managersController = require('../controllers/managers');
const validateManager = require('../middleware/validateManager');
const validateId = require('../middleware/validateId');
const isAuthenticated = require('../middleware/authenticated');

router.get('/', managersController.getAllManagers);

router.get('/:id', validateId, managersController.getManagerById);

router.post('/',
  isAuthenticated,
  validateManager, managersController.createManager);

router.put(
  '/:id',
  isAuthenticated,
  validateId,
  validateManager,
  managersController.updateManager);

router.delete('/:id',
  isAuthenticated,
  validateId,
  managersController.deleteManager);

module.exports = router;
