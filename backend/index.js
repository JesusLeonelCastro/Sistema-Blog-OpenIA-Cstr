//importar dependencias
const express = require('express');
const cors = require('cors');


//conectar a la base de datos
const connection = require('./database/connection');
connection();

//crear servidor de la nube
const app = express();
const port = 3907;

//configurar cors 
app.use(cors());

//Convertir los datos del body a objetos de js
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Cargar rutas
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);


//Poner el servidor a escuchar peticiones
app.listen(port, ()=>{
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
