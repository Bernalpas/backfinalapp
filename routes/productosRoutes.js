
// Improtamos express y el router
import { Router } from 'express';
const router = Router();

// si queremos validar los datos de los productos
import { body } from "express-validator";

// Importamos el controlador de productos para mostrar el formulario de productos
import { 
    guardarProducto,
    listarProductos,
    detallesProducto,
    actualizarProducto,
    eliminarProducto,
} from '../controllers/productosController.mjs';


// Rutas de productos: responden a /api/productos..

//2. Ruta para procesar el formulario de productos
router.post('/guardarProducto', 
    [
        body("nombre", "El nombre es obligatorio").isString().trim().notEmpty(),
        body("precio", "El precio es obligatorio").isNumeric().trim().notEmpty(),
        body("descripcion", "La descripcion es obligatoria").isString().trim().notEmpty(),
    ],
    guardarProducto);

//3. Ruta para listar los productos guardados en la base de datos
router.get('/listarProductos', listarProductos);

//4. Ruta para mostrar los detalles de un producto específico 
router.get('/detalleProducto/:id', detallesProducto);

//5. Ruta para actualizar un producto específico
router.put('/actualizarProducto/:id', actualizarProducto);

//6. Ruta para eliminar un producto específico
router.delete('/eliminarProducto/:id', eliminarProducto);


// Exportar el router
export default router;
