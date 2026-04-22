

// 1. Importar mongoose para obtener la función de conexión a MongoDB
import mongoose from 'mongoose';

// 2. Importar dotenv para cargar las variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// 3. Uri de conexión a MongoDB local
const uri = "mongodb://localhost:27017/ecommerce";


const conexionMongoLocal = async () => {

  mongoose.connect(uri).then(
    () => { 
      console.log("Conexión a MongoDB local establecida");
    },
    err => { 
      console.error("Error al conectar a MongoDB local:", err);
    }
  );

}

export { conexionMongoLocal };
