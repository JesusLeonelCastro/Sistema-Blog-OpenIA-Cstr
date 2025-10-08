const validator = require("validator");

const validate = (params) => {
         
let validation = false;

// Validate nombre 
let name = !validator.isEmpty(params.name) 
            && validator.isLength(params.name, { min: 3, max: 30 }) 
            && validator.isAlpha(params.name, 'es-ES');

//validar apellido
let surname = !validator.isEmpty(params.surname) 
            && validator.isLength(params.surname, { min: 3, max: 50 }) 
            && validator.isAlpha(params.surname, 'es-ES');

//validar nick
let nick = !validator.isEmpty(params.nick) 
            && validator.isLength(params.nick, { min: 3, max: 50 });

 //validar email
let email = !validator.isEmpty(params.email) 
            && validator.isEmail(params.email);

//validar password/
let password = !validator.isEmpty(params.password) 
            && validator.isLength(params.password, { min: 6, max: 100 });

//comprobar que todo se cumple
    if(!name || !surname || !nick || !email || !password){

        throw new Error('Los datos no son validos');
    }else{
        console.log('Validacion correcta');
        validation = true;
    }

    return validation;
}

module.exports = validate;