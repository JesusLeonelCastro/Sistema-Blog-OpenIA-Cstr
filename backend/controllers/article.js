//importaciones 


//metodos
const save = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de guardar articulo'
    });
}

const list = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de listar articulos'
    });
}

const detail = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de obtener detalle de articulo'
    });
}

const update = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de actualizar articulo'
    });
}  

const generate = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de generar articulo con IA'
    });
}   

const remove = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de eliminar articulo'
    });
} 

const byUser = (req, res) => {

    return res.status(200).json({
        status: 'success',
        message: 'Metodo de obtener articulos por usuario'
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