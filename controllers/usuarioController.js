const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.crearUsuario = async (req, res) => {
 
  console.log (req.body)
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ msg: errores.array() });
  }
  const { email,password } = req.body;
  
  try {
    let usuarioEncontrado = await Usuario.findOne({ email: email });

    if (usuarioEncontrado) {
      return res.status(400).send("Email ya esta en uso");
    }
    let usuario;
   
    usuario = new Usuario(req.body);
   
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);
   
    await usuario.save();

    
    res.send("Usuario Creado Correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    res.status(400).send("Hubo un error en la conexion a la base de datos");
  }
};

exports.obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("name email");
    res.send(usuario);
  } catch (error) {
    res.status(400).send("Hubo un error en la conexion a la base de datos");
  }
};

exports.modificarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (req.body.hasOwnProperty('email')){
      usuario.email=req.body.email;
    }
    
    await usuario.save();
    if (!req.body.nombre) {
    return res.status(400).send("Dato de nombre incompleto");
    }
    usuario.nombre = req.body.nombre;
    await usuario.save();
    res.send(usuario)
    res.send(usuario);
  } catch (error) {
    res.status(400).send("Hubo un error en la conexion a la base de datos");
  }
};

exports.borrarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.send("usuario eliminado");
  } catch (error) {
    res.status(400).send("Hubo un error en la conexion a la base de datos");
  }
};
