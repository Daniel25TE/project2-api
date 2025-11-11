const { getDatabase } = require('../db/database');
const { ObjectId } = require('mongodb');


const getAllEmployees = async (req, res) => {
  try {
    const employees = await getDatabase().collection('Employees').find().toArray();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

const getEmployeeById = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await getDatabase()
      .collection('Employees')
      .findOne({ _id: new ObjectId(id) });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

const createEmployee = async (req, res) => {
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    workEmail: req.body.workEmail,
    title: req.body.title,
    division: req.body.division,
    manager: req.body.manager,
    jobType: req.body.jobType,
  };

  try {
    const response = await getDatabase()
      .collection('Employees')
      .insertOne(employee);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Employee created successfully',
        employeeId: response.insertedId,
      });
    } else {
      res.status(500).json({
        message: 'Error inserting employee',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

module.exports = { getAllEmployees, createEmployee, getEmployeeById };