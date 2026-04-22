// importamos validationResult de express-validator
import { validationResult } from 'express-validator';

// importamos bcrypt
import bcrypt from 'bcrypt';

// Importamos el modelo de usuario para poder guardar los datos en la base de datos
import UsuarioCollection from '../models/usuariosModel.js';

// importamos la función para enviar el email
import { enviarMail } from '../helps/enviarMail.js';

// endpoint para el registro del user
const registrarUsuario = async (req, res)=>{

  
  //1. Validamos los datos del formulario
  const errors = validationResult(req); //true //false
  
  //1.1 Si hay errores, devolvemos un mensaje de error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array().map(item => item.msg).join(', ')
    });
  }


  //2. Recibimos los datos del formulario
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;
    //const confirmPassword = req.body.confirm_password;

    const persona = {
        nombre,
        email,
        password
    }

  // Creamos una función asíncrona para guardar el usuario en la base de datos
const guardarUsuario = async () => {
  try {
          // Antes de gauardar los datos, encriptamos el password
            const salt = await bcrypt.genSalt(10);
            // impriimos la salt
          console.log(salt);
            persona.password = await bcrypt.hash(password, salt);
          console.log(persona.password);
          
        // Creamos una instancia del modelo de usuario con los datos recibidos
            const usuarioNuevo = new UsuarioCollection(persona);

            // Guardamos el usuario en la base de datos
            await usuarioNuevo.save();

            // enviar un mail al user 
            await enviarMail(nombre, email);
            
            res.status(200).json({
                message: 'Usuario registrado con éxito',
            });
        } catch (error) {

          console.log(error);

            res.status(500).json({
              message: 'Error al guardar el usuario'
            });
        }
}
    
  // invocamos la función para guardar el usuario en la base de datos
    await guardarUsuario();

} 

// endpoint para el login del user
const loginUsuario = async (req, res)=>{

  //validamos los datos del req
  const errors = validationResult(req);

  // 1.1 Si hay errores, devolvemos un mensaje de error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array().map(item => item.msg).join(', ')
    });
  }

  const emailUsuario = req.body.email;
  const passwordUsuario = req.body.password;

  try {
    // buscar al user en la base de datos
    const usuario = await UsuarioCollection.findOne({ email: emailUsuario });

    console.log(usuario);

    if (!usuario){
      return res.status(400).json({
        message: 'El usuario no existe',
      });
    }

    // si el user existes comparamos el password encriptado con el que envió
    const passwordValido = await bcrypt.compare(passwordUsuario, usuario.password);

    console.log("passwordValido: ", passwordValido);

    if (!passwordValido){
      return res.status(400).json({
        message: 'El password es incorrecto',
      });
    }
    console.log(passwordValido)

    // si el password coincide devolvemos un mensaje de éxito
    res.status(200).json({
      message: 'Login exitoso',
    });


  } catch (error) {
    console.log(error);
  }
}

export {
    registrarUsuario,
    loginUsuario,
}
