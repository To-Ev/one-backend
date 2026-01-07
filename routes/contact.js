const express = require('express');
const handleContact = require('../controllers/handleContact');
const router = express.Router();

router.post('/contact', handleContact);

module.exports = router