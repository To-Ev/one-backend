const express = require('express');
const router = express.Router();
const mStorage = require('../middleware/multer');
const handleUploads = require('../controllers/handleUploads');
const UsersDB = require('../model/usersDB');
const ROLES_LIST = require('../config/ROLES_LIST');
const verifyRoles = require('../middleware/verifyRoles');

router.post('/uploads', mStorage, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin), handleUploads);

router.get('/uploads/all', async (req, res) =>{

    try {
        const result = await UsersDB.find().sort({ createdAt: -1});

        return res.status(200).json({ result })
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
    
});

module.exports = router