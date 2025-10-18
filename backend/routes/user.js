//importaciones
const express = require('express');
const routes = express.Router();

const userController = require('../controllers/user');
const { auth } = require('../middlewares/auth');

//subida de archivos
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/avatars');
    },
    filename: (req, file, cb) => {
        cb(null, "avatar_" + Date.now() + "-" + file.originalname);
    }
});

const uploadsAvatar = multer({ storage: storage }); 


//definir las rutas
routes.post('/register', userController.register);
routes.post('/login', userController.login);
routes.get('/profile/:id', userController.profile);
routes.put('/update', auth, userController.update);
routes.put('/upload', [auth, uploadsAvatar.single('file0')], userController.upload);
routes.get('/avatar/:file', userController.avatar);
routes.get('/soloparaidentificados', auth, userController.soloparaUsuariosIdentificados);

//exportar rutas
module.exports = routes    