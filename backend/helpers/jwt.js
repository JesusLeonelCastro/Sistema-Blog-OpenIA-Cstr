//importar jwt
const jwt = require('jwt-simple');
const { avatar } = require('../controllers/user');
const { default: isTaxID } = require('validator/lib/isTaxID');

//clave secreta
const SECRET = 'clave_secreta_para_jwt_12345';

//crear funciom para generar token
const createToken = (user) => {

    let now = Math.floor(Date.now() / 1000);
    let expiration = now + 30 * 24 * 60 * 60; // 30 dias

  const payload = {
    id: user._id,
    name: user.name,
    surname: user.surname,
    nick: user.nick,
    email: user.email,
    bio: user.bio,
    avatar: user.avatar,
    iat: now,
    exp: expiration
  };
  return jwt.encode(payload, SECRET);
};

//exportar funcion
module.exports = {
  createToken,
  SECRET
};
