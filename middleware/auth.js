const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ code: 401, message: "Token no proporcionado" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
      return res.status(401).json({ code: 401, message: "Formato de token invalido" });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, "debugkey");
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ code: 401, message: "Token invalido" });
  }
};
