
// Librerías
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Importar rutas
import usuariosRouter from './routes/usuariosRoutes.js';
import productosRouter from './routes/productosRoutes.js';

// Crear el servidor
const app = express();

// Middleware
app.use(cors()); // todos los origenes pueden acceder a mi servidor
/* app.use(cors({
    maxAge: 0,
    origin: 'http://localhost:5173, http://localhost:3000',//solo con el dominio deployado del front
    methods: 'GET, POST, PUT, DELETE'
})); */// permito que cualquier origen acceda a mi servidor
app.use(morgan('dev')); //datos de las peticiones en consola
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Vivo en el Backend");
})

// Utilizamos las Rutas
app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', productosRouter);

// Exportar el servidor
export  default app;


