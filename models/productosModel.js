

//1. Importar Mongoose
import mongoose from 'mongoose';

//2. Definir el esquema del modelo
const productoSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true,
    trim: true,
    min: 2,
  },
    precio: {
    type: Number,
    required: true,
    min: 0,
  },
    descripcion: {
    type: String,
    required: true
  },
    imagen: {
    type: String,
    required: true
  },
    dataRegistro:{
        type: Date,
        default: Date.now
    }
});


//3. Exportar el modelo
export default mongoose.model('producto', productoSchema);;
