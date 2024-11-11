const {Router} = require('express');
const router = Router();

var {login, logout, validarLogin} = require('./../controllers/validator.controller');


router.get('/api/login/', login);
router.get('/api/logout/', logout);
router.get('/api/validar/login/', validarLogin);

module.exports = router;