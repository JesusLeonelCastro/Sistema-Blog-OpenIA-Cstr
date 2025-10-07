// importar dependencias
const mongoose = require('mongoose');

// conectar a mongodb
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/bd-blog', {
        });
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        
    }
}

// exportar la funcion de conexion
module.exports = connectDB;