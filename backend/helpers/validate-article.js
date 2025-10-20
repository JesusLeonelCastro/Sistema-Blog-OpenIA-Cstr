const validator = require("validator");

const validate = (params) => {
         
let validation = false;

// Validate titulo
let title = !validator.isEmpty(params.title) 
            && validator.isAlpha(params.title.replace(/\s/g, ''), 'es-ES');



//validar contenido
let content = !validator.isEmpty(params.content) 
            && validator.isLength(params.content, { min: 3, max: 50 }) 
            && validator.isAlpha(params.content.replace(/\s/g, ''), 'es-ES');



//comprobar que todo se cumple
    if(!title || !content){

        throw new Error('Los datos no son validos');
    }else{
        console.log('Validacion correcta');
        validation = true;
    }

    return validation;
}

module.exports = validate;