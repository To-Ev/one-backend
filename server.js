const dotenv = require('dotenv');
dotenv.config();    
const path = require('path')
const express = require('express');
const app = express();
const cors= require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const corsOption = require('./config/corsOption')
const PORT = 5000;

connectDB()
// Custom middleware
app.use(cors(corsOption));

// Serve the Backend/public folder (fix incorrect path)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

// middleware for json and cookie
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) =>{
    res.send('Server is running on backend')
});

// router routes
app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/register'));
app.use('/api', require('./routes/logout'));
app.use('/api', require('./routes/refresh'));
app.use('/api', require('./routes/uploads'));
app.use('/api', require('./routes/contact'));

// verification
// app.use(verifyJWT);
app.use('/api', require('./routes/uploads'));

app.use((err, req, res, next) => { 
    console.error(err.stack); 
    if (!res.headersSent) { 
        res.status(500).json({ err: "Server error" }); 
    } 
});
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB database');
    app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)})
});
