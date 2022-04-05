const jwt = require('jsonwebtoken');
const config = require('../config/config');



const auth = (req, res, next) => {
    const header = req.headers.auth;

    if (!header) return res.send({ error: "Token nao enviado" });

    jwt.verify(header, config.jwtSenha, (err, decoded) => {
        if (err) return res.send({ error: "token invalido" })
        res.locals.auth_data = decoded;
        return next();
    });
}

module.exports = auth;