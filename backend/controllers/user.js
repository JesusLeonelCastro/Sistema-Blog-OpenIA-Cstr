//importaciones 
const validate = require('../helpers/validate-user');
const user = require('../models/user');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../helpers/jwt');


//Metodos

//Metodo guardar usuario
const register = async (req, res) => {
  try {
    // 1) Recoger y normalizar datos
    const body = { ...req.body };

    // 2) Validar
    validate(body);

    // 3) Normalizar campos únicos
    body.email = String(body.email || "").toLowerCase().trim();
    body.nick = String(body.nick || "").toLowerCase().trim();

    // 4) Control de duplicados
    const existing = await User.findOne({
      $or: [{ email: body.email }, { nick: body.nick }]
    });
    if (existing) {
      return res.status(400).json({
        status: "error",
        message: "El email o nick ya está en uso"
      });
    }

    // 5) Cifrar contraseña
    body.password = await bcrypt.hash(body.password, 10);

    // 6) Crear y guardar
    const user = new User(body);
    const userSaved = await user.save();

    // 7) No exponer la contraseña en la respuesta
    const userObj = userSaved.toObject();
    delete userObj.password;


    return res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: userObj
    });
  } catch (err) {
    // Duplicados por índice único
    if (err && err.code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "El email o nick ya está en uso (índice único)"
      });
    }

    // Errores de validación propios
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: "Validación no superada",
        details: err.message
      });
    }

    // Fallback
    return res.status(500).json({
      status: "error",
      message: "Error en el servidor",
      details: err?.message || String(err)
    });
  }
};

//Metodo Inicio de sesión
const login = async (req, res) => {
  try {
    const body = req.body || {};

    if (!body.email || !body.password) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan datos por enviar'
      });
    }

    const user = await User.findOne({ email: body.email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      });
    }

    const pwdMatch = bcrypt.compareSync(body.password, user.password);
    if (!pwdMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Contraseña incorrecta'
      });
    }

    const userData = {
      _id: user._id,
      name: user.name,
      nick: user.nick,
      email: user.email,
      
    };

    
    // Si usas JWT, genera token aquí y añádelo a la respuesta:
    const token = jwt.createToken(user);

    // const token = jwtService.createToken(user);
    return res.status(200).json({
      status: 'success',
      user: userData,
      token: token
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al buscar el usuario',
      details: err?.message || String(err)
    });
  }
};


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

const soloparaUsuariosIdentificados = (req, res) => {

  return res.status(200).json({
    status: 'success',
    message: 'Tienes acceso a esta seccion por q estas identificado',
    datosDelUsuario: req.user
  });
}

//exportaciones
module.exports = {
  register,
  login,
  profile,
  update,
  upload,
  soloparaUsuariosIdentificados,
  avatar
};