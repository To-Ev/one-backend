
const verifyRoles = (...allowedRoles) =>{
    return (req, res, next) =>{
        if(!req?.roles) return res.sendStatus(403);
        const rolesArray = [...allowedRoles];
        const roles = req.roles;
        console.log(rolesArray);
        console.log(roles);

        roles.map( role => rolesArray.includes(role)).find( i => i === true);
        next()
    }
}

module.exports = verifyRoles