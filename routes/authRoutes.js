
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');


router.post(
    '/register',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email Valido').isEmail(),
        check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
    ],
    authController.registrar
);
router.post(
    '/login',
    [
        check('email', 'Agrega un Email Valido').isEmail(),
        check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
    ],
    authController.login
);


router.get('/', authController.obtenerUsuarioAutenticado);

module.exports = router;
