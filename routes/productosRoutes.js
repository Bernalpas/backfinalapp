
// Improtamos express y el router
import { Router } from 'express';
const router = Router();

import { body } from "express-validator";

// Importamos el controlador de productos para mostrar el formulario de productos
import { 
    guardarProducto,
    listarProductos,
    detallesProducto
} from '../controllers/productosController.mjs';


// Rutas de productos: responden a /api/productos..

//2. Ruta para procesar el formulario de productos
router.post('/guardarProducto', guardarProducto);

//3. Ruta para listar los productos guardados en la base de datos
router.get('/listarProductos', listarProductos);

//4. Ruta para mostrar los detalles de un producto específico 
router.get('/detalleProducto/:id', detallesProducto);

// Exportar el router
export default router;
