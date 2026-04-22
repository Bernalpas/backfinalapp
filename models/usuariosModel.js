
//* Código para crear las colecciones de Usuarios en MongoDB Atlas utilizando Mongoose
//* Esta collección se llama usuarios y tiene el siguiente esquema:

//1. Importar Mongoose
import mongoose from 'mongoose';

//2. Crear el esquema de usuario
const usuarioCollection = new mongoose.Schema({
    nombre:{
        type: String,   // tipo de dato
        required: true, // campo obligatorio
        trim: true,  // eliminar espacios al inicio y al final
        lowercase: true, // convertir a minúsculas
        min: 3, // longitud mínima
        max: 20 // longitud máxima
    },
    email:{
        type: String,
        required: true,
        unique: true, // el email debe ser único en la colección
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        min: 6, // longitud mínima
        max: 20, // longitud máxima
    },
    rol:{
        type: String,
        enum: ['user', 'admin'], // el rol solo puede ser 'user' o 'admin'
        default: 'user' // valor por defecto
    },
    dataRegistro:{
        type: Date,
        default: Date.now // valor por defecto: fecha y hora actual
    }
    
});

//3. Crear el modelo de usuario
const UsuarioModel = mongoose.model('usuario', usuarioCollection);

//4. Exportar el modelo de usuario
export default UsuarioModel;


// 5. las dos a la vez
//export default UsuarioModel;
