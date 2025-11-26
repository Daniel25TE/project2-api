const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');
const validateEmployee = require('../middleware/validateEmployee');
const validateId = require('../middleware/validateId');
//const isAuthenticated = require('../middleware/authenticated');
const authorize = require('../middleware/authorize');

router.get('/', authorize('customer'), employeesController.getAllEmployees);

router.get('/:id', authorize('customer'), validateId, employeesController.getEmployeeById);

router.post('/',
  authorize('customer'),
  //isAuthenticated,
  validateEmployee, employeesController.createEmployee);

router.put(
  '/:id',
  authorize('customer'),
  //isAuthenticated,
  validateId,
  validateEmployee,
  employeesController.updateEmployee);

router.delete('/:id',
  authorize('customer'),
  //isAuthenticated,
  validateId,
  employeesController.deleteEmployee);

module.exports = router;
