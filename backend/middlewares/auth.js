//importar modulos
const jwt = require("jwt-simple");

// importar la clave secreta correctamente
const { SECRET } = require("../helpers/jwt");

// middleware de autenticacion
exports.auth = (req, res, next) => {

    // comprobar si llega la cabecera de autenticacion
    if (!req.headers.authorization) {
        return res.status(401).json({
            status: "error",
            message: "La peticion no tiene la cabecera de autenticacion"
        });
    }

    // limpiar el token (acepta "Bearer <token>" o solo el token)
    let token = req.headers.authorization.replace(/['"]+/g, '');
    if (token.startsWith('Bearer ')) token = token.slice(7);

    try {
        // decodificar el token
        const payload = jwt.decode(token, SECRET);
        
        // comprobar expiracion (si tu payload usa exp en segundos)
        if (payload.exp && payload.exp <= Math.floor(Date.now() / 1000)) {
            
            return res.status(401).json({
                status: "error",
                message: "El Token ha expirado"
            });
        }

        // añadir datos del usuario a la request
        req.user = payload;

    } catch (err) {
        return res.status(401).json({
            status: "error",
            message: "Token no valido"
        });
    }

    next();
};