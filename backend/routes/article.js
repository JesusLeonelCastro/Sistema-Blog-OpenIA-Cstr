//importaciones
const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');

const ArticleController = require('../controllers/article');


//cargar middleware de autenticacion
//configracion de subidad de archivos
//subida de archivos
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/posters');
    },
    filename: (req, file, cb) => {
        cb(null, "poster_" + Date.now() + "-" + file.originalname);
    }
});

const uploadsPoster = multer({ storage: storage });

//definir rutas

router.post('/save', auth, ArticleController.save);
router.get('/list/:page', ArticleController.list);
router.get('/detail/:id', ArticleController.detail);
router.post('/generate-ia', ArticleController.generate);
router.put('/update', ArticleController.update);
router.delete('/remove', ArticleController.remove);
router.get('/by-user/:userId', ArticleController.byUser);
router.get('/search/:search', ArticleController.search);
router.put('/upload/:id', ArticleController.upload);
router.get('/poster/:file', ArticleController.poster);

//exportaciones
module.exports = router; 