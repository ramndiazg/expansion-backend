const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const Miembro = require("../models/Miembro");

const generarToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

// Login del panel (Admin/Publicador)
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(401).json({ error: "Credenciales inválidas" });
    if (!usuario.activo)
      return res.status(403).json({ error: "Cuenta desactivada" });

    const valido = await bcrypt.compare(password, usuario.passwordHash);
    if (!valido)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const token = generarToken({
      id: usuario._id,
      tipo: "usuario",
      rol: usuario.rol,
    });
    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de miembro (para comentar)
exports.loginMiembro = async (req, res) => {
  try {
    const { email, password } = req.body;
    const miembro = await Miembro.findOne({ email });
    if (!miembro)
      return res.status(401).json({ error: "Credenciales inválidas" });
    if (miembro.estado !== "aprobado") {
      return res
        .status(403)
        .json({ error: "Tu afiliación aún no ha sido aprobada" });
    }

    const valido = await bcrypt.compare(password, miembro.passwordHash);
    if (!valido)
      return res.status(401).json({ error: "Credenciales inválidas" });

    const token = generarToken({ id: miembro._id, tipo: "miembro" });
    res.json({
      token,
      miembro: {
        id: miembro._id,
        nombre: miembro.nombre,
        email: miembro.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
