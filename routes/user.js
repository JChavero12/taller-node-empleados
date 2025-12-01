const express = require("express");
const jwt = require("jsonwebtoken");
const user = express.Router();
const db = require("../config/db");

user.post("/signin", async (req, res, next) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    if (user_name && user_email && user_password) {

      let query = "INSERT INTO user (user_name, user_email, user_password) ";
      query += `VALUES ('${user_name}', '${user_email}', '${user_password}');`;

      const rows = await db.query(query);

      if (rows.affectedRows == 1) {
        return res.status(201).json({ code: 201, message: "Usuario insertado correctamente" });
      }

      return res.status(500).json({ code: 500, message: "Error al insertar el usuario" });
    }

    return res.status(400).json({ code: 400, message: "Campos incompletos" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 500, message: "Error interno al registrar usuario" });
  }
});

user.post("/login", async (req, res, next) => {
  try {
    const { user_email, user_password } = req.body;

    if (user_email && user_password) {

      let query = `SELECT * FROM user WHERE user_email = '${user_email}' `;
      query += `AND user_password = '${user_password}';`;

      const rows = await db.query(query);

      if (rows.length == 1) {

        const token = jwt.sign(
          {
            user_id: rows[0].user_id,
            user_email: rows[0].user_email
          },
          "debugkey"
        );

        return res.status(200).json({ code: 200, message: token });
      }

      return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
    }

    return res.status(400).json({ code: 400, message: "Campos incompletos" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 500, message: "Error interno al iniciar sesión" });
  }
});

user.get("/", async (req, res, next) => {
  const query = "SELECT * FROM user;";
  const rows = await db.query(query);

  return res.status(200).json({ code: 200, data: rows });
});

module.exports = user;
