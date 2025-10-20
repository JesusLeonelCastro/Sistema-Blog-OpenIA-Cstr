//importaciones 
const { Schema, model } = require('mongoose');
const user = require('./user');
const mongoosePaginate = require('mongoose-paginate-v2');

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

articleSchema.plugin(mongoosePaginate);
//exportar modelo 

module.exports = model('Article', articleSchema, "articles");


