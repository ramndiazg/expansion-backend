const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
    const token = header.split(" ")[1];
    req.auth = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

// Para rutas del panel (Usuario: admin o publicador)
exports.requireRolUsuario =
  (...roles) =>
  (req, res, next) => {
    if (req.auth?.tipo !== "usuario" || !roles.includes(req.auth.rol)) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para esta acción" });
    }
    next();
  };

// Para rutas de miembros (comentar, etc.)
exports.requireMiembro = (req, res, next) => {
  if (req.auth?.tipo !== "miembro") {
    return res.status(403).json({ error: "Debes iniciar sesión como miembro" });
  }
  next();
};
