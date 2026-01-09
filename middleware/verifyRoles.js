
const verifyRoles = (...allowedRoles) =>{
    return (req, res, next) =>{
        if(!req?.roles) return res.sendStatus(403);
        const rolesArray = [...allowedRoles];
        const roles = req.roles;

        const isAllowed = roles.map( role => rolesArray.includes(role)).find( i => i === true);
        if(!isAllowed) return res.status(403).json({ message: 'Access Denied' });
        next()
    }
}

module.exports = verifyRoles