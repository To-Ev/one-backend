const mongoose = require('mongoose')

const connectDB = async () =>{
    const url = process.env.MONGO_URL;

    try{
        await mongoose.connect(url, {
            dbName: "PORTFOLIO"
        })
    }catch(err){
        console.error(`Failed to connect to mongoDB:`,err)
    }
}
module.exports = connectDB