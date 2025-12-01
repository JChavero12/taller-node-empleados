const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res, next) => {
  const emp = await db.query('SELECT * FROM employee;');
  res.status(200).json({ code: 200, message: emp });
});

router.post("/", async (req, res, next) => {
  try {
    const { employee_name, employee_lastname, employee_phone, employee_email, employee_address } = req.body;

    if (employee_name && employee_lastname && employee_phone && employee_email && employee_address) {

      let query = "INSERT INTO employee (employee_name, employee_lastname, employee_phone, employee_email, employee_address) ";
      query += `VALUES ('${employee_name}', '${employee_lastname}', '${employee_phone}', '${employee_email}', '${employee_address}');`;

      const rows = await db.query(query);

      if (rows.affectedRows == 1) {
        return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
      }

      return res.status(500).json({ code: 500, message: "Error al insertar el empleado" });
    }

    return res.status(400).json({ code: 400, message: "Campos incompletos" });
  } catch (err) {
    console.log("ERROR INSERT EMPLOYEE:", err);
    return res.status(500).json({ code: 500, message: "Error interno al insertar empleado" });
  }
});

router.patch('/:id', async (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ code: 400, message: "ID invalido" });
  }

  const { employee_name, employee_lastname, employee_phone, employee_email, employee_address } = req.body;

  let fields = [];

  if (employee_name) fields.push(`employee_name='${employee_name}'`);
  if (employee_lastname) fields.push(`employee_lastname='${employee_lastname}'`);
  if (employee_phone) fields.push(`employee_phone='${employee_phone}'`);
  if (employee_email) fields.push(`employee_email='${employee_email}'`);
  if (employee_address) fields.push(`employee_address='${employee_address}'`);

  if (fields.length === 0) {
    return res.status(400).json({ code: 400, message: "No hay campos para actualizar" });
  }

  const query = `UPDATE employee SET ${fields.join(", ")} WHERE employee_id = ${id};`;
  const result = await db.query(query);

  if (result.affectedRows === 1) {
    return res.status(200).json({ code: 200, message: "Campos actualizados correctamente" });
  }

  return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

router.put("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ code: 400, message: "ID inválido" });
  }

  const { employee_name, employee_lastname, employee_phone, employee_email, employee_address } = req.body;

  if (employee_name && employee_lastname && employee_phone && employee_email && employee_address) {

    let query = `UPDATE employee SET employee_name='${employee_name}', employee_lastname='${employee_lastname}', `;
    query += `employee_phone='${employee_phone}', employee_email='${employee_email}', employee_address='${employee_address}' `;
    query += `WHERE employee_id=${id};`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
    }

    return res.status(500).json({ code: 500, message: "Ocurrió un error" });
  }

  return res.status(400).json({ code: 400, message: "Campos incompletos" });
});

router.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ code: 400, message: "ID inválido" });
  }

  const query = `DELETE FROM employee WHERE employee_id = ${id};`;
  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res.status(200).json({ code: 200, message: "Empleado eliminado correctamente" });
  }

  return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

module.exports = router;
