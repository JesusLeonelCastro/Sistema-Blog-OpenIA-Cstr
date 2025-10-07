//importaciones
const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/article');

//cargar middleware de autenticacion
//configracion de subidad de archivos
//definir rutas

router.post('/save', ArticleController.save);
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