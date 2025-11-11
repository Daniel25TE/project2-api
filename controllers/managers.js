const { getDatabase } = require('../db/database');
const { ObjectId } = require('mongodb');


const getAllManagers = async (req, res) => {
  try {
    const managers = await getDatabase().collection('Managers').find().toArray();
    res.status(200).json(managers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching managers' });
  }
};

const getManagerById = async (req, res) => {
  const id = req.params.id;

  try {
    const manager = await getDatabase()
      .collection('Managers')
      .findOne({ _id: new ObjectId(id) });

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    res.status(200).json(manager);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching manager' });
  }
};

const createManager = async (req, res) => {
  const manager = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    workEmail: req.body.workEmail,
    title: req.body.title,
    division: req.body.division,
    area: req.body.area,
    jobType: req.body.jobType,
  };

  try {
    const response = await getDatabase()
      .collection('Managers')
      .insertOne(manager);

    if (response.acknowledged) {
      res.status(201).json({
        message: 'Manager created successfully',
        managerId: response.insertedId,
      });
    } else {
      res.status(500).json({
        message: 'Error inserting manager',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message,
    });
  }
};

module.exports = { getAllManagers, createManager, getManagerById };

