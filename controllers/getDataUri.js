const DatauriParser = require('datauri/parser');
const path = require('path');

const getDataUri = (file) =>{
    const parser = new DatauriParser();

    const ext = path.extname(file.originalname).toString();
    return parser.format(ext, file.buffer);
}

module.exports = getDataUri;