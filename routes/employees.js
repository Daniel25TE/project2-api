const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');
const validateEmployee = require('../middleware/validateEmployee');
const validateId = require('../middleware/validateId');
const isAuthenticated = require('../middleware/authenticated');

router.get('/', employeesController.getAllEmployees);

router.get('/:id', validateId, employeesController.getEmployeeById);

router.post('/',
  isAuthenticated,
  validateEmployee, employeesController.createEmployee);

router.put(
  '/:id',
  isAuthenticated,
  validateId,
  validateEmployee,
  employeesController.updateEmployee);

router.delete('/:id',
  isAuthenticated,
  validateId,
  employeesController.deleteEmployee);

module.exports = router;
