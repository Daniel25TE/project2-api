const { getDatabase } = require('../db/database');

const getAllManagers = async (req, res) => {
  try {
    const managers = await getDatabase().collection('Managers').find().toArray();
    res.status(200).json(managers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching managers' });
  }
};

const createManager = async (req, res) => {
  const manager = req.body;
  if (!manager.name || !manager.email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await getDatabase().collection('Managers').insertOne(manager);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error creating manager' });
  }
};

module.exports = { getAllManagers, createManager };

