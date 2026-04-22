
import ProductosModel from '../models/productosModel.js';

const  guardarProducto = async (req, res) => {
  //Desestructuramos los datos recibidos en el cuerpo de la petición
  const nuevoProducto = {
    nombre: req.body.nombreProducto,
    precio: req.body.precioProducto,
    descripcion: req.body.descripcionProducto,
    imagen: req.body.imagenProducto
  };

  console.log(nuevoProducto);

  // Creamos una nueva instancia del modelo Producto con los datos recibidos
const crearProducto = new ProductosModel(nuevoProducto);
  // Guardamos el producto en la base de datos
  try {
    await crearProducto.save();
    return res.status(200).json({
      message: 'Producto creado con éxito',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al guardar el producto'
    });
  }
}

  // función para listar los productos guardados en la base de datos
const listarProductos = async (req, res) => {

    try{
      const productos = await ProductosModel.find({}).lean();
      console.log(productos);    
      return res.status(200).json({
        message: 'Productos encontrados',
          productos
      })
    }catch(error){
      return res.status(500).json({
      message: 'Error al guardar el producto',
      error: error.message
    });
  }
}

  // función para mostrar los detalles de un producto específico
const detallesProducto = async (req, res) => {

  try{
    const id = req.params.id;
    const product = await ProductosModel.findById(id);

    if(!product){
      return res.status(404).send({
        message: "No existe ese producto"
      })
      }

      return res.status(200).send({
        message: "Producto encontrado",
        product
      })

    }catch(err){
        console.log(err);
        return res.status(500).send("Internal server error")
    }

}

export {
    guardarProducto,
    listarProductos,
    detallesProducto
}

