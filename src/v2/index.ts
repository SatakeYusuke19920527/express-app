import express from 'express';
import fullweb from './fullweb';

const router = express.Router();

// v1以下のルーティング
router.use('/fullweb', fullweb);

module.exports = router;