const express = require('express');
const router = express.Router();

router.use('/', require('./auth'));

router.use('/managers', require('./managers'));
router.use('/employees', require('./employees'));
router.use('/users', require('./users'));
router.use('/', require('./swagger'));

module.exports = router;
