const FormDB = require('../model/formDB');

const handleLogout = async (req, res) =>{
    const Cookies = req.cookies;

    if(!Cookies?.refreshToken) return res.status(400).json({ err: "Invalid Token" });
    const refreshToken = Cookies.refreshToken;
    const node_env = process.env.NODE_ENV

    try {
        const foundUser = await FormDB.findOne({ refreshToken }).exec();

        if(!foundUser) {
            if(node_env === "PROD"){
                res.clearCookie('refreshToken', {httpOnly: true, secure: true});
            }else{
                res.clearCookie('refreshToken', {httpOnly: true, secure: false});
            }
            return res.sendStatus(204);
        };

        foundUser.refreshToken = '';
        foundUser.save();
        
        // send back a response
        if(node_env === "PROD"){
            res.clearCookie('refreshToken', {httpOnly: true, secure: true});
        }else{
            res.clearCookie('refreshToken', {httpOnly: true, secure: false});
        }
        return res.status(200).json({ msg: "Logout successful" });
        
    } catch (err) {
        console.error(err);
        return res.sendStatus(401);
    }
}

module.exports = handleLogout