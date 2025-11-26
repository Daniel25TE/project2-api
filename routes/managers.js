const express = require('express');
const router = express.Router();
const managersController = require('../controllers/managers');
const validateManager = require('../middleware/validateManager');
const validateId = require('../middleware/validateId');
const isAuthenticated = require('../middleware/authenticated');
const authorize = require('../middleware/authorize');

router.get('/', isAuthenticated, authorize('customer'), managersController.getAllManagers);

router.get('/:id', isAuthenticated, authorize('customer'), validateId, managersController.getManagerById);

router.post('/',
  isAuthenticated,
  authorize('admin'),
  validateManager, managersController.createManager);

router.put(
  '/:id',
  isAuthenticated,
  authorize('admin'),
  validateId,
  validateManager,
  managersController.updateManager);

router.delete('/:id',
  isAuthenticated,
  authorize('admin'),
  validateId,
  managersController.deleteManager);

module.exports = router;
