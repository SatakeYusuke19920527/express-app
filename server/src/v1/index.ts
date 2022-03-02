import express from 'express';
const users = require('./users');

const router = express.Router();

// v1以下のルーティング
router.use('/users', users);

module.exports = router;