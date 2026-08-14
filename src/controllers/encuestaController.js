const Encuesta = require("../models/Encuesta");

exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.activa) filtro.activa = req.query.activa === "true";
    const encuestas = await Encuesta.find(filtro).sort({ createdAt: -1 });
    res.json(encuestas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const encuesta = await Encuesta.findById(req.params.id);
    if (!encuesta)
      return res.status(404).json({ error: "Encuesta no encontrada" });
    res.json(encuesta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Público — usado por la página de detalle /encuestas/[slug]
exports.getBySlug = async (req, res) => {
  try {
    const encuesta = await Encuesta.findOne({ slug: req.params.slug }).select(
      "-votantes",
    );
    if (!encuesta)
      return res.status(404).json({ error: "Encuesta no encontrada" });
    res.json(encuesta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const encuesta = await Encuesta.create({
      ...req.body,
      creadoPor: req.auth.id,
    });
    res.status(201).json(encuesta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Votar — abierto a cualquiera, protegido por un ID anónimo generado en el navegador
exports.votar = async (req, res) => {
  try {
    const { votanteId } = req.body;
    if (!votanteId) {
      return res.status(400).json({ error: "Falta identificador de votante" });
    }

    const encuesta = await Encuesta.findById(req.params.id);
    if (!encuesta)
      return res.status(404).json({ error: "Encuesta no encontrada" });

    if (!encuesta.activa) {
      return res.status(400).json({ error: "Esta encuesta ya está cerrada" });
    }

    if (encuesta.votantes.includes(votanteId)) {
      return res.status(409).json({ error: "Ya votaste en esta encuesta" });
    }

    const opcion = encuesta.opciones.id(req.params.opcionId);
    if (!opcion) {
      return res.status(404).json({ error: "Opción no encontrada" });
    }

    opcion.votos += 1;
    encuesta.votantes.push(votanteId);
    await encuesta.save();

    const { votantes, ...encuestaSinVotantes } = encuesta.toObject();
    res.json(encuestaSinVotantes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.cerrar = async (req, res) => {
  try {
    const encuesta = await Encuesta.findById(req.params.id);
    if (!encuesta)
      return res.status(404).json({ error: "Encuesta no encontrada" });

    const esDuena = encuesta.creadoPor?.toString() === req.auth.id;
    if (req.auth.rol !== "admin" && !esDuena) {
      return res
        .status(403)
        .json({ error: "Solo puedes cerrar tus propias encuestas" });
    }

    encuesta.activa = false;
    encuesta.fechaCierre = new Date();
    await encuesta.save();
    res.json(encuesta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const encuesta = await Encuesta.findById(req.params.id);
    if (!encuesta)
      return res.status(404).json({ error: "Encuesta no encontrada" });

    const esDuena = encuesta.creadoPor?.toString() === req.auth.id;
    if (req.auth.rol !== "admin" && !esDuena) {
      return res
        .status(403)
        .json({ error: "Solo puedes eliminar tus propias encuestas" });
    }

    await encuesta.deleteOne();
    res.json({ mensaje: "Encuesta eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
