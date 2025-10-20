//importaciones 
const validate = require('../helpers/validate-article');
const Article = require('../models/article');


//metodos
//Metodo guardar articulo
const save = async (req, res) => {

    // recoger los datos del articulo
    const body = req.body || {};

    // validar los datos (tu helper puede lanzar)
    try {
        validate(body);
    } catch (err) {
        return res.status(400).json({
            status: 'error',
            message: 'Validacion del articulo no superada',
            details: err?.message || String(err)
        });
    }

    // sacar id del usuario identificado (soporta sub, _id o id)
    const userIdentity = req.user || {};
    const userId = userIdentity.sub || userIdentity._id || userIdentity.id;
    if (!userId) {
        return res.status(401).json({
            status: 'error',
            message: 'No autorizado: usuario no identificado'
        });
    }

    // asignar usuario al body
    body.user = userId;

    try {
        // crear y guardar articulo
        const articleToSave = new Article(body);
        const article = await articleToSave.save();

        if (!article) {
            return res.status(500).json({
                status: 'error',
                message: 'El articulo no se ha guardado'
            });
        }

        return res.status(201).json({
            status: 'success',
            message: 'El articulo se ha guardado correctamente',
            article // devuelve el artículo guardado
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al guardar el articulo',
            details: err?.message || String(err)
        });
    }

}

//Metodo listar articulos paginados
const list = (req, res) => {

    //sacar los parametros de la url
    let params = req.params;
    //controlar la pagina
    let page = 1;

    if (params.page) {
        page = (params.page);
    }
    //configuracion de paginacion
    const itemsPerPage = 10;
    const options = {
        page,
        limit: itemsPerPage,
        sort: { created_at: -1 },
        populate: {
            path: 'user',
            select: '-password -created_at -__v'
        }
    };
    //consutlar y listar  los articulos con mongoose pagination
    Article.paginate({}, options, (err, articles) => {
        if (err || !articles) {

            return res.status(500).json({
                status: 'error',
                message: 'Error al listar los articulos',
                details: err?.message || String(err)
            });
        }
        //devolver resultado (json)
        return res.status(200).json({
            status: 'success',
            page,
            itemsPerPage,
            total: articles.totalDocs,
            articles: articles.docs,
            pages: Math.ceil(articles.totalDocs / itemsPerPage)
        });
    });

}

//Metodo detalle de articulo
const detail = async (req, res) => {

    try {
        const id = req.params.id;

        // validar id de mongoose para evitar CastError
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'ID de artículo inválido'
            });
        }

        const article = await Article.findById(id).populate({
            path: 'user',
            select: '-password -created_at -__v'
        }).exec();

        if (!article) {
            return res.status(404).json({
                status: 'error',
                message: 'Artículo no encontrado'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Detalle de artículo',
            article
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al obtener detalle del artículo',
            details: err?.message || String(err)
        });
    }
}

//Metodo actualizar articulo
const update = async (req, res) => {

    try {
        const body = req.body || {};

        if (!body.id) {
            return res.status(400).json({
                status: 'error',
                message: 'Falta el id del artículo'
            });
        }

        // validar los datos (tu helper puede lanzar)
        try {
            validate(body);
        } catch (err) {
            return res.status(400).json({
                status: 'error',
                message: 'Validacion del articulo no superada',
                details: err?.message || String(err)
            });
        }

        // sacar identidad del usuario identificado
        const userIdentity = req.user || {};
        const userId = userIdentity.sub || userIdentity._id || userIdentity.id;
        if (!userId) {
            return res.status(401).json({
                status: 'error',
                message: 'No autorizado'
            });
        }

        // buscar artículo
        const article = await Article.findById(body.id).exec();
        if (!article) {
            return res.status(404).json({
                status: 'error',
                message: 'Articulo no encontrado'
            });
        }

        // comprobar propietario
        if (article.user.toString() !== userId.toString()) {
            return res.status(403).json({
                status: 'error',
                message: 'No tienes permiso para actualizar este articulo'
            });
        }

        // preparar datos a actualizar (proteger el campo user)
        const updateData = { ...body };
        delete updateData.user;
        delete updateData.id; // evitar colisiones

        const articleUpdated = await Article.findByIdAndUpdate(body.id, updateData, { new: true }).exec();
        if (!articleUpdated) {
            return res.status(500).json({
                status: 'error',
                message: 'No se pudo actualizar el articulo'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Articulo actualizado correctamente',
            article: articleUpdated
        });

    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: 'Error al actualizar el articulo',
            details: err?.message || String(err)
        });
    }

};

const generate = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de generar articulo con IA'
    });
}

//Metodo eliminar articulo
const remove = async (req, res) => {

    try {
        const id = req.params.id || req.body.id;
        if (!id) {
            return res.status(400).json({ status: 'error', message: 'Falta el id del artículo' });
        }

        // validar id de mongoose
        const mongoose = require('mongoose');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ status: 'error', message: 'ID de artículo inválido' });
        }

        // obtener identidad del usuario desde el token
        const userIdentity = req.user || {};
        const userId = userIdentity.sub || userIdentity._id || userIdentity.id;
        if (!userId) {
            return res.status(401).json(
                { 
                    status: 'error', 
                    message: 'No autorizado' 
                });
        }

        // buscar artículo
        const article = await Article.findById(id).exec();
        if (!article) {
            return res.status(404).json(
                { 
                    status: 'error', 
                    message: 'Artículo no encontrado' 
                });
        }

        // comprobar propietario
        if (article.user.toString() !== userId.toString()) {
            return res.status(403).json(
                { 
                    status: 'error', 
                    message: 'No tienes permiso para eliminar este artículo' 
                });
        }

        // eliminar fichero asociado (si existe)
        try {
            const fs = require('fs');
            const path = require('path');
            if (article.poster) {
                const filePath = path.resolve('./uploads/posters/' + article.poster);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
        } catch (e) {
            // no abortar la eliminación por fallo al borrar el fichero
        }

        // eliminar artículo
        await Article.findByIdAndDelete(id).exec();

        return res.status(200).json(
            { 
                status: 'success', 
                message: 'Artículo eliminado correctamente', id 
            });
    } catch (err) {
        return res.status(500).json(
            { 
                status: 'error', 
                message: 'Error al eliminar el artículo', 
                details: err?.message || String(err) 
            });
    }
}

//Metodo listar articulos de un usuario
const byUser = (req, res) => {

     //sacar los parametros de la url
    let params = req.params;
    //controlar la pagina
    let page = 1;

    if (params.page) {
        page = (params.page);
    }
    //configuracion de paginacion
    const itemsPerPage = 10;
    const options = {
        page,
        limit: itemsPerPage,
        sort: { created_at: -1 },
        populate: {
            path: 'user',
            select: '-password -created_at -__v'
        }
    };
    //consutlar y listar  los articulos con mongoose pagination
    Article.paginate({user : req.params.userId}, options, (err, articles) => {
        if (err || !articles) {

            return res.status(500).json({
                status: 'error',
                message: 'Error al listar los articulos',
                details: err?.message || String(err)
            });
        }
        //devolver resultado (json)
        return res.status(200).json({
            status: 'success',
            page,
            itemsPerPage,
            total: articles.totalDocs,
            articles: articles.docs,
            pages: Math.ceil(articles.totalDocs / itemsPerPage)
        });
    });
}

const search = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de buscar articulos'
    });
}

const upload = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de subir articulos'
    });
}

const poster = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de sacar la imagen del articulos'
    });
}

//exportaciones
module.exports = {
    save,
    list,
    detail,
    update,
    generate,
    remove,
    byUser,
    search,
    upload,
    poster
};