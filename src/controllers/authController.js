const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const Miembro = require("../models/Miembro");

const generarToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

// Login unificado: busca primero en Usuario (panel), si no existe busca en Miembro.
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (usuario) {
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
      return res.json({
        token,
        tipo: "usuario",
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
        },
      });
    }

    const miembro = await Miembro.findOne({ email });
    if (miembro) {
      if (miembro.estado !== "aprobado") {
        return res
          .status(403)
          .json({ error: "Tu afiliación aún no ha sido aprobada" });
      }
      const valido = await bcrypt.compare(password, miembro.passwordHash);
      if (!valido)
        return res.status(401).json({ error: "Credenciales inválidas" });

      const token = generarToken({ id: miembro._id, tipo: "miembro" });
      return res.json({
        token,
        tipo: "miembro",
        miembro: {
          id: miembro._id,
          nombre: miembro.nombre,
          email: miembro.email,
        },
      });
    }

    return res.status(401).json({ error: "Credenciales inválidas" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, passwordNueva } = req.body;
    if (!passwordNueva || passwordNueva.length < 6) {
      return res.status(400).json({
        error: "La nueva contraseña debe tener al menos 6 caracteres",
      });
    }

    const Modelo = req.auth.tipo === "usuario" ? Usuario : Miembro;
    const cuenta = await Modelo.findById(req.auth.id);
    if (!cuenta) return res.status(404).json({ error: "Cuenta no encontrada" });

    const valido = await bcrypt.compare(passwordActual, cuenta.passwordHash);
    if (!valido)
      return res
        .status(401)
        .json({ error: "La contraseña actual no es correcta" });

    cuenta.passwordHash = passwordNueva; // el hook pre('save') del modelo la hashea
    await cuenta.save();

    res.json({ mensaje: "Contraseña actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
