const express = require('express');
const handleRefreshToken = require('../controllers/handleRefreshToken');
const router = express.Router();

router.get('/refresh', handleRefreshToken)

module.exports = router