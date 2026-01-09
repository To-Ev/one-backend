const getDataUri = require('./getDataUri');
const cloudinary = require('../config/cloudinary');
const UsersDB = require('../model/usersDB');

const handleUploads = async (req, res, next) =>{
    const { title, description, projectType, liveURL} = req.body;
    const files = req.files;

    if(!title || !description || !projectType || !files) return res.status(400).json({ err: "Please enter a valid input" });

    console.log("Files received:", files);
    try{
        const PromiseImage = files.map( async (file) =>{

            const fileBuffer = getDataUri(file);
            const cloud = await cloudinary.uploader.upload(fileBuffer.content);

            return ({
                url: cloud.secure_url,
                id: cloud.public_id
            })
        }) 

        const resultURI = await Promise.all(PromiseImage);

        const result = await UsersDB.create({
            image: resultURI,
            title: title,
            description: description,
            liveURL: liveURL,
            projectType: projectType
        });

       return res.status(200).json({ result: result, msg: "Upload successful!"});

    }catch(err){
        console.error(err)
        // return res.status(500).json({ err: "Problem when handling uploads" }); 
        next(err);
    }

}

module.exports = handleUploads