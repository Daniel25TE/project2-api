const { ObjectId } = require('mongodb');

const validateId = (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
};

module.exports = validateId;
