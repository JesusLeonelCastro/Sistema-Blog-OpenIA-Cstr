//importaciones
const express = require('express');
const routes = express.Router();

const userController = require('../controllers/user');
const { auth } = require('../middlewares/auth');

//subida de archivos

//definir las rutas
routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.get('/profile/:id', userController.profile);
routes.put('/update', auth, userController.update);
routes.post('/upload/:id', userController.upload);
routes.get('/avatar/:id', userController.avatar);
routes.get('/soloparaidentificados', auth, userController.soloparaUsuariosIdentificados);

//exportar rutas
module.exports = routes    