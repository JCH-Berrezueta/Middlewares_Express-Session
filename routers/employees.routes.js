const {Router} = require('express');
const router = Router();

var {filterEmployees,deleteEmployee,getAllEmployees,getEmployeeById,insertEmployee,updateEmployee} = require('./../controllers/employees.controller');
var {validarSession} = require('./../controllers/validator.controller');
//rutas de endpoint para la tabla Employee


router.get('/api/employees-listar/', validarSession, getAllEmployees);
router.get('/api/employees-filtrar/', validarSession, filterEmployees);
router.get('/api/employees-obtener/', validarSession, getEmployeeById);

router.post('/api/employees-insertar/', validarSession, insertEmployee);

router.put('/api/employees-actualizar/', validarSession, updateEmployee);
router.delete('/api/employees-eliminar/', validarSession, deleteEmployee);


module.exports = router;