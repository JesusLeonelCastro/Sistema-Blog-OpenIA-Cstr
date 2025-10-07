//importaciones 



//acciones

const register = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de registrar usuario'
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