const jwt = require('jsonwebtoken');

//Verificacion de token

let verificaToken = (req, res, next) => {

    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decode.usuario;
        next();

    });
};

//Verificacion de rol (ADMIN_ROLE)

let verificaRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'No posee permisos para realizar esta acción'
            }
        });
    }
};

module.exports = { verificaToken, verificaRole };