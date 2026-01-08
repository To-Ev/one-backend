const FormDB = require('../model/formDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) =>{
    const {username, password} = req.body;

    try {
        if(!username || !password) return res.status(400).json({ err: "Enter Password & Username" });
        const foundUser = await FormDB.findOne({ username }).exec();

        if(!foundUser) return res.status(401).json({ err: `User ${username} not found!`});

        const match = await bcrypt.compare(password, foundUser.password);
        if(!match) return res.status(401).json({ err: `Invalid password` });

        const roles = Object.values(foundUser.roles);

        // create jwt
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        const refreshToken = jwt.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '15m'}
        );

        // save in DataBase
        foundUser.refreshToken = refreshToken;
        foundUser.save();

        const node_env = process.env.NODE_ENV
        if(node_env === "PROD"){
            res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, sameSite: "None", maxAge: 5 * 24 * 60 * 60 * 1000});
        }else{
            res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: false, maxAge: 5 * 24 * 60 * 60 * 1000});
        }
        
        return res.status(200).json({ accessToken, msg: "Login successful!" })

    } catch (err) {
        console.error(err);
        return res.sendStatus(401);
    }
}

module.exports = handleLogin