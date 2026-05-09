
import ProductosModel from '../models/productosModel.js';

const  guardarProducto = async (req, res) => {
  //Desestructuramos los datos recibidos en el cuerpo de la petición
  const nuevoProducto = {
    nombre: req.body.nombreProducto,
    precio: req.body.precioProducto, //verificar si es número desde el front
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

// Función para actualizar un producto específico
const actualizarProducto = async (req, res) => {

  try{
    // obtenemos el id del producto a actualizar
    const id = req.params.id;

    console.log(id);

    // capturamos los datos del producto a actualizar
    const nuevoProducto = {
      nombre: req.body.nombreProducto,
      precio: req.body.precioProducto, //verificar si es número desde el front
      descripcion: req.body.descripcionProducto,
      imagen: req.body.imagenProducto
    };

    console.log(id);

    console.log(nuevoProducto);
    
    // buscamos en la database el producto a actualizar y lo actualizamos
    const productoAcrualizado = await ProductosModel.findByIdAndUpdate(id, nuevoProducto, {
      new: true
    });

    console.log(productoAcrualizado);

    // si no existe el producto, devolvemos un error
    if(!productoAcrualizado){
      return res.status(404).send({
        message: "No existe ese producto"
      })
    }

    // si el producto se actualizad con éxito, devolvemos un mensaje de éxito
    console.log(productoAcrualizado);

    return res.status(200).send({
      message: "Producto actualizado con éxito"
    })

  }catch(err){
    console.log(err);
    return res.status(500).send("Internal server error")
  }

}

// Función para eliminar un producto de la base de datos
const eliminarProducto = async (req, res) => {
    try {
        // 1. Extraemos el ID del producto desde la URL
        const id = req.params.id;

        // 2. Usamos el método de Mongoose para buscar el documento por su ID y borrarlo directamente
        const productoEliminado = await ProductosModel.findByIdAndDelete(id);

        // 3. Validamos si el producto existía antes de intentar borrarlo
        if (!productoEliminado) {
            return res.status(404).send({
                message: "No existe ese producto para eliminar"
            });
        }

        // 4. Respondemos con éxito confirmando la eliminación al frontend
        return res.status(200).json({
            message: 'Producto eliminado correctamente',
            producto: productoEliminado // Opcional: devolvemos los datos del producto que acabamos de borrar
        });

    } catch (error) {
        // 5. Capturamos cualquier error inesperado
        return res.status(500).json({
            message: 'Error al eliminar el producto',
            error: error.message
        });
    }
};

export {
    guardarProducto,
    listarProductos,
    detallesProducto,
    actualizarProducto,
    eliminarProducto
}

