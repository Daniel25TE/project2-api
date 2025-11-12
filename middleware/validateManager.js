const { body, validationResult } = require('express-validator');

const validateManager = [
  body('firstName').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
  body('workEmail').isEmail(),
  body('title').isString().notEmpty(),
  body('division').isString().notEmpty(),
  body('area').isString().notEmpty(),
  body('jobType').isString().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateManager;
