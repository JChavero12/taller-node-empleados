# Proyecto Final – Taller de Node.js

Este proyecto implementa una API REST para la administración de empleados del departamento de Recursos Humanos de la empresa Taller de Node.js S.A. de C.V.
Incluye inicio de sesión, autenticación mediante JWT y operaciones CRUD sobre los empleados.

taller-node-empleados/
│
├── config/
│   └── db.js
│
├── middleware/
│   ├── auth.js
│   ├── cors.js
│   ├── index.js
│   └── notFound.js
│
├── routes/
│   ├── user.js
│   └── employees.js
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signin.html
│   ├── employees.html
│   └── js/
│       ├── login.js
│       ├── signin.js
│       └── employees.js
│
├── database.sql
├── index.js
├── package.json
└── README.md

Instalar dependencias
npm install

Utilizar DB.sql para trabajar con la base de datos

