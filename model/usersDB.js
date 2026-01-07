const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    image: [
        {
            url: String,
            id: String
        },
    ],
    title:{ type: String, required: true},
    description:{ type: String, required: true},
    projectType: String,
    liveURL: String
}, {timestamps: true});

const UsersDB = mongoose.model('UsersDB', schema);
module.exports = UsersDB;