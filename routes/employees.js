const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');
const validateEmployee = require('../middleware/validateEmployee');
const validateId = require('../middleware/validateId');
const isAuthenticated = require('../middleware/authenticated');
const authorize = require('../middleware/authorize');

router.get('/', isAuthenticated, authorize('customer'), employeesController.getAllEmployees);

router.get('/:id', isAuthenticated, authorize('customer'), validateId, employeesController.getEmployeeById);

router.post('/',
  isAuthenticated,
  authorize('admin'),
  validateEmployee, employeesController.createEmployee);

router.put(
  '/:id',
  isAuthenticated,
  authorize('admin'),
  validateId,
  validateEmployee,
  employeesController.updateEmployee);

router.delete('/:id',
  isAuthenticated,
  authorize('admin'),
  validateId,
  employeesController.deleteEmployee);

module.exports = router;
