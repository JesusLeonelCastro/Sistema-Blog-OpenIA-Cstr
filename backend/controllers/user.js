//importaciones 
const validate = require('../helpers/validate-user');
const User = require('../models/user');
const bcrypt = require('bcrypt');


//Metodos

const register = (req, res) => {

    //recoger los datos de la perticion
    let body = req.body;

    //validar los datos
    try {
        validate(body);

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validacion de usuario no superado',

        });
    }

    //control de usuarios duplicados
    User.find({
        $or: [
            { email: body.email.toLowerCase() },
            { nick: body.nick.toLowerCase() }
        ]
        }).exec(async (users) => {
            if (users && users.length >= 1) {
                return res.status(400).json({
                    status: 'error',
                    message: 'el usuario ya existe',
                });
            }

        //cifrar la contraseña
        let pwd = await bcrypt.hash(body.password, 10);
        body.password = pwd;

        //crear obejeto de usuario
        body.email = body.email.toLowerCase();
        body.nick = body.nick.toLowerCase();

        let userToSave = new User(body);

        //guardar el usuario en la base de datos
        userToSave.save().then((userSaved) => {
            if (!userSaved) {
                return res.status(500).json({
                    status: 'error',
                    message: 'Error al guardar usuario',
                });
            }
            return res.status(200).json({
                status: 'success',
                message: 'Usuario registrado correctamente',
                user: userSaved
            });

        });

        //devolver respuesta
        return res.status(200).json({
            status: 'success',
            message: 'Accion para registrar usuario',

        });

    }).catch(err => {
        return res.status(500).json({
            status: 'error',
            message: 'Error en la consulta de usuarios',
            error: err
        });
    });

}

const login = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de login usuario'
    });
}

const profile = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de obtener perfil de usuario'
    });
}

const update = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de actualizar perfil de usuario'
    });
}

const upload = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de subir imagen de perfil de usuario'
    });
}

const avatar = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de sacar imagen de avatar de usuario'
    });
}


//exportaciones
module.exports = {
    register,
    login,
    profile,
    update,
    upload,
    avatar
}