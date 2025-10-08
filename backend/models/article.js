//importaciones 
const { Schema, model } = require('mongoose');
const user = require('./user');

//deficion de schema - entidades

const articleSchema = new Schema({

    title: 
    { 
        type: String, 
        required: true
     },
    content: 
    { 
        type: String, 
        required: true 
    },
    user: { 
        type: Schema.ObjectId, 
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

//exportar modelo 

module.exports = model('Article', articleSchema, "articles");


