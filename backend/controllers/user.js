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

//Metodo ver perfil de usuario
const profile = async (req, res) => {
  try {
    const id = req.params.id;
    const myUser = await User.findById(id)
    
    .select({ 
      password: 0, 
      created_At: 0,
      email: 0
    });

    if (!myUser) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no existe'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Perfil de usuario encontrado',
      user: myUser
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al buscar el usuario'
      
    });
  }
};

const update = async(req, res) => {

  try {
    // id del usuario identificado en el token (sub, _id o id según tu payload)
    const userIdentity = req.user || {};
    const userId = userIdentity.sub || userIdentity._id || userIdentity.id;
    if (!userId) {
      return res.status(401).json({ status: 'error', message: 'No autorizado' });
    }

    // construir objeto con los campos a actualizar (usar req, no request)
    const userToUpdate = {
      name: req.body.name ?? userIdentity.name,
      surname: req.body.surname ?? userIdentity.surname,
      nick: req.body.nick ?? userIdentity.nick,
      email: req.body.email ?? userIdentity.email,
      bio: req.body.bio ?? userIdentity.bio
    };

    // validar datos (si tu validate admite segundo parámetro para update)
    validate(userToUpdate, false);

    // comprobar duplicados (email o nick) excluyendo al propio usuario
    const duplicate = await User.findOne({
      $or: [{ email: userToUpdate.email }, { nick: userToUpdate.nick }]
    }).exec();

    if (duplicate && duplicate._id.toString() !== userId.toString()) {
      return res.status(400).json({ status: 'error', message: 'El email o nick ya está en uso' });
    }

    // actualizar en la BD y devolver el nuevo documento (sin password)
    const updatedUser = await User.findByIdAndUpdate(userId, userToUpdate, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Usuario actualizado correctamente',
      user: updatedUser
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al actualizar el usuario',
      details: err?.message || String(err)
    });
  }
  
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