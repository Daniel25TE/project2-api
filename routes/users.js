const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db/database');

// Update user role by GitHub ID
router.put('/users/:githubId/role', async (req, res) => {
  try {
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const { role } = req.body; // expected: "admin" or "customer"

    if (!['admin', 'customer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const result = await usersCollection.updateOne(
      { githubId: req.params.githubId },
      { $set: { role } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: `Role updated to ${role}` });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});
router.get('/users', async (req, res) => {
  try {
    const db = getDatabase();
    const usersCollection = db.collection('users');

    const users = await usersCollection.find({}).toArray();

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
