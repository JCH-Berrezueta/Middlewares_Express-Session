const pool = require('../db/db');



//req => peticion (lo q te envian)
//res => respuesta (lo q le envias o respondes)

//Listar
async function getAllEmployees(req, res) {
    try {
        const client = await pool.connect();
        console.log("conexion exitosa para listar");
        const result = await pool.query('select * from employees')
        client.release();
        res.json(result.rows); //respondiendo
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el Servidor'
        });
    }
}

//Buscar
async function filterEmployees(req, res) {
    const { id } = req.params;
    const clave = '%' + id + '%';
    const values = [clave];
    const query = 'select * from employees where /// = $1';
    try {
        const client = await pool.connect();
        console.log("conexion exitosa para buscar Employees");
        const result = await pool.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.json(result.rows); //respondiendo
        } else {
            res.status(400).json({
                message: 'No se encontro Employees'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el Servidor'
        });
    }
}

//Obtener por ID
async function getEmployeeById(req, res) {
    const { id } = req.params;
    const values = [id];
    const query = 'select * from employees where employee_id = $1';
    try {
        const client = await pool.connect();
        console.log("conexion exitosa para obtener");
        const result = await pool.query(query, values);
        client.release();
        if (result.rowCount > 0) {
            res.json(result.rows); //respondiendo
        } else {
            res.status(400).json({
                message: 'No existe el Employee'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el Servidor'
        });
    }
}


//insertar
async function insertEmployee(req, res) {
    const employee = req.body;
    const values = [
        employee.employee_id,
        employee.first_name,
        employee.last_name,
        employee.email,
        employee.phone_number,
        employee.hire_date,
        employee.job_id,
        employee.salary,
        employee.commission_pct,
        employee.manager_id,
        employee.department_id
    ];
    console.log(employee);
    console.log(values);
    const query = 'insert into employees values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';

    try {
        const client = await pool.connect();
        console.log("conexion exitosa para insertar");
        await pool.query(query, values);
        client.release();
        res.status(201).json({
            message: 'Employee insertado correctamente'
        });
        //return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el Servidor'
        });
    }
}

//modificar
async function updateEmployee(req, res) {
    const heroe = req.body;
    const values = [
        heroe.id, //1
        heroe.nombre, //2
        heroe.bio, //3
        heroe.img, //4
        heroe.aparicion, //5
        heroe.casa, //6
    ];
    const query = 'update employees set ///';
    try {
        const client = pool.connect();
        console.log("conexion exitosa para modificar");
        const result = pool.query(query, values);
        client.release();
        res.status(201).json({
            message: 'Employee modificado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el Servidor'
        });
    }
}

//eliminar
async function deleteEmployee(req, res) {
    const { id } = req.params;
    const values = [id];
    const query = 'delete from Employees where employee_id=$1';
    try {
        const client = pool.connect();
        console.log("conexion exitosa para eliminar");
        const result = pool.query(query, values);
        //client.release();
        res.status(201).json({
            message: 'Employee eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error en el Servidor'
        });
    }
}


module.exports = {
    deleteEmployee,
    insertEmployee,
    updateEmployee,
    getAllEmployees,
    filterEmployees,
    getEmployeeById
}