const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
   
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    const { email, password } = req.body;

    try {
        
        let usuarioEncontrado = await Usuario.findOne({ email });

        if (usuarioEncontrado) {
            return res.status(400).send('Email ya esta en uso');
        }

        let usuario;

       
        const bodyUsuario = { ...req.body, role: 'user' };
        usuario = new Usuario(bodyUsuario);

        
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

      
        await usuario.save();

        res.send('Usuario Creado Correctamente');
    } catch (error) {
       
        res.status(400).send('Hubo un error');
    }
};

exports.login = async (req, res) => {
    try {
        
        const errores = validationResult(req);
        
        if (!errores.isEmpty()) {

            return res.status(400).json({ msg: errores.array() });
        }
    

        const { email, password } = req.body;
       
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ msg: 'El Usuario no existe' });
        }

        
        const passCorrect = await bcryptjs.compare(password, usuario.password);
        if (!passCorrect) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

      
        const payload = {
            usuario: {
                id: usuario.id,
                role: usuario.role,
            },
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 36000000, 
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token, name: usuario.name });
            }
        );
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.obtenerUsuarioAutenticado = async (req, res) => {
  
    const token = req.header('x-auth-token');
   
    if (!token) {
        return res.status(401).json({ msg: 'No hay Token, permiso no valido' });
    }

   
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        const usuario = await Usuario.findById(cifrado.usuario.id).select('name role email');
        res.send(usuario);
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido' });
    }
};

