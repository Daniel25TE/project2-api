const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/database');

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await getDatabase()
      .collection('Employees')
      .find()
      .toArray();
    res.status(200).json(employees);
  } catch (err) {
    next(err);
  }
};

const getEmployeeById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const employee = await getDatabase()
      .collection('Employees')
      .findOne({ _id: new ObjectId(id) });

    if (!employee) {
      const error = new Error('Employee not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
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

    if (!response.acknowledged) {
      const error = new Error('Failed to insert employee');
      error.status = 500;
      throw error;
    }

    res.status(201).json({
      message: 'Employee created successfully',
      employeeId: response.insertedId,
    });
  } catch (err) {
    next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  const id = req.params.id;

  const updatedEmployee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    workEmail: req.body.workEmail,
    title: req.body.title,
    division: req.body.division,
    manager: req.body.manager,
    jobType: req.body.jobType,
  };

  try {
    const result = await getDatabase()
      .collection('Employees')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedEmployee });

    if (result.matchedCount === 0) {
      const error = new Error('Employee not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await getDatabase()
      .collection('Employees')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      const error = new Error('Employee not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
