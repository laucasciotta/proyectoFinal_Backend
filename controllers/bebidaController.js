const jwt = require('jsonwebtoken');
const Bebida = require("../models/Bebida");


exports.crearBebida = async (req, res) => {
  try {
   
    const token = req.header('x-auth-token');
  
    if (!token) {
        return res.status(401).json({ msg: 'No hay Token, permiso no valido' });
    }
console.log('jsw token',token,process.env.SECRETA)
    const cifrado = jwt.verify(token, process.env.SECRETA);
   
    const bebida = new Bebida(req.body);

    await bebida.save();
    res.send("bebida creada ");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
exports.borrarBebida = async (req, res) => {
  try {
    await Bebida.findByIdAndDelete(req.params.id);
    res.send('Bebida eliminada');
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};
exports.modificarBebida = async (req, res) => {
  try {
    const bebida = await Bebida.findById(req.params.id);
    if (req.body.hasOwnProperty('nombre')) {
        bebida.nombre = req.body.nombre;
    }
    if (req.body.hasOwnProperty('imagen')) {
        bebida.imagen = req.body.imagen;
    }
    if (req.body.hasOwnProperty('precio')) {
        bebida.precio = req.body.precio;
    }
    await bebida.save();
    res.send(bebida);
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};
exports.obtenerBebidas = async (req, res) => {
  try {
    const bebidas = await Bebida.find();
    res.send(bebidas);
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};

exports.obtenerBebida = async (req, res) => {
  try {
    const bebida = await Bebida.findById(req.params.id);
    res.send(bebida)
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};
