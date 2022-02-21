
const express = require('express');
const router = express.Router();
const bebidaControllers = require('../controllers/bebidaController')

router.post('/',bebidaControllers.crearBebida);
router.get('/',bebidaControllers.obtenerBebidas);
router.get('/:id',bebidaControllers.obtenerBebida);
router.put('/:id',bebidaControllers.modificarBebida);
router.delete('/:id',bebidaControllers.borrarBebida);

module.exports=router;
