const FormDB = require('../model/formDB');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) =>{
    const {username, password} = req.body;

    try {
        if(!username || !password) return res.status(400).json({ err: "Enter Password & Username"});
        const conflict = await FormDB.findOne({ username }).exec();
        if(conflict) return res.status(409).json({ err: `User with username already exist!` });

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = await FormDB.create({
            "username": username,
            "roles": {
                User: 2001
            },
            "password": hashedPwd,
        });

        return res.status(200).json({ msg: `New user ${username} created Successfully` });
    } catch (err) {
        console.error(err);
        return res.sendStatus(401);
    }

}

module.exports = handleRegister