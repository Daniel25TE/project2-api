const { ObjectId } = require('mongodb');
const { getDatabase } = require('../db/database');

const getAllManagers = async (req, res, next) => {
  try {
    const managers = await getDatabase()
      .collection('Managers')
      .find()
      .toArray();
    res.status(200).json(managers);
  } catch (err) {
    next(err);
  }
};

const getManagerById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const manager = await getDatabase()
      .collection('Managers')
      .findOne({ _id: new ObjectId(id) });

    if (!manager) {
      const error = new Error('Manager not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json(manager);
  } catch (err) {
    next(err);
  }
};

const createManager = async (req, res, next) => {
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

    if (!response.acknowledged) {
      const error = new Error('Failed to insert manager');
      error.status = 500;
      throw error;
    }

    res.status(201).json({
      message: 'Manager created successfully',
      managerId: response.insertedId,
    });
  } catch (err) {
    next(err);
  }
};

const updateManager = async (req, res, next) => {
  const id = req.params.id;

  const updatedManager = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    workEmail: req.body.workEmail,
    title: req.body.title,
    division: req.body.division,
    area: req.body.area,
    jobType: req.body.jobType,
  };

  try {
    const result = await getDatabase()
      .collection('Managers')
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedManager });

    if (result.matchedCount === 0) {
      const error = new Error('Manager not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: 'Manager updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteManager = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await getDatabase()
      .collection('Managers')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      const error = new Error('Manager not found');
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: 'Manager deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager,
};
