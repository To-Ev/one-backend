const FormDB = require('../model/formDB');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) =>{
    const Cookies = req.cookies;

    if(!Cookies?.refreshToken) return res.status(400).json({ err: "Invalid token" });
    const refreshToken = Cookies.refreshToken;

    try {
        const foundUser = await FormDB.findOne({ refreshToken }).exec();

        if(!foundUser) return res.sendStatus(401);
        const roles = Object.values(foundUser.roles);   
        // verify jwt
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) =>{
                if(err || decoded.userInfo.username !== foundUser.username) return res.sendStatus(403);

                //  create a new accessToken
                const accessToken = jwt.sign(
                    {
                        "userInfo": {
                            "username": foundUser.username,
                            "roles": roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '15m'}
                );
                // send back a cookie with token as response
                return res.json({ accessToken });
            }
        );

    } catch (err) {
        console.error(err);
        return res.sendStatus(401);
    }
}

module.exports = handleRefreshToken