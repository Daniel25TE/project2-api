const { getDatabase } = require('../db/database');

const getAllEmployees = async (req, res) => {
  try {
    const employees = await getDatabase().collection('Employees').find().toArray();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

const createEmployee = async (req, res) => {
  const employee = req.body;
  if (!employee.name || !employee.email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await getDatabase().collection('Employees').insertOne(employee);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating employees' });
  }
};

module.exports = { getAllEmployees, createEmployee };