const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employees');
const validateEmployee = require('../middleware/validateEmployee');
const validateId = require('../middleware/validateId');

router.get('/', employeesController.getAllEmployees);
router.get('/:id', validateId, employeesController.getEmployeeById);
router.post('/', validateEmployee, employeesController.createEmployee);
router.put(
  '/:id',
  validateId,
  validateEmployee,
  employeesController.updateEmployee
);
router.delete('/:id', validateId, employeesController.deleteEmployee);

module.exports = router;
