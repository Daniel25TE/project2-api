const express = require('express');
const router = express.Router();
const managersController = require('../controllers/managers');
const validateManager = require('../middleware/validateManager');
const validateId = require('../middleware/validateId');

router.get('/', managersController.getAllManagers);
router.get('/:id', validateId, managersController.getManagerById);
router.post('/', validateManager, managersController.createManager);
router.put(
  '/:id',
  validateId,
  validateManager,
  managersController.updateManager
);
router.delete('/:id', validateId, managersController.deleteManager);

module.exports = router;
