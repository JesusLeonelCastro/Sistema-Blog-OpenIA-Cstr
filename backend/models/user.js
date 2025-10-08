//importaciones 
const { Schema, model } = require('mongoose');
const { avatar } = require('../controllers/user');

//deficion de schema - entidades

const userSchema = new Schema({

    name: 
    { 
        type: String, 
        required: true
     },
    surname: 
    { 
        type: String, 
        required: true 
    },
    nick: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
    },
    avatar: { 
        type: String, 
        default: "default.png" 
    },
    bio: { 
        type: String 
    },
    password: { 
        type: String, 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

//exportar modelo 

module.exports = model('User', userSchema, "users");