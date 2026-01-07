const multer = require('multer');

const storage = multer.memoryStorage()

const mStorage = multer({ storage: storage}).array('files');

module.exports = mStorage