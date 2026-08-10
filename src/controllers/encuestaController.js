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

exports.create = async (req, res) => {
  try {
    const encuesta = await Encuesta.create(req.body);
    res.status(201).json(encuesta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Votar por una opción específica dentro de la encuesta
exports.votar = async (req, res) => {
  try {
    const encuesta = await Encuesta.findOneAndUpdate(
      { _id: req.params.id, "opciones._id": req.params.opcionId },
      { $inc: { "opciones.$.votos": 1 } },
      { new: true },
    );
    if (!encuesta)
      return res.status(404).json({ error: "Encuesta u opción no encontrada" });
    res.json(encuesta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const encuesta = await Encuesta.findByIdAndDelete(req.params.id);
    if (!encuesta)
      return res.status(404).json({ error: "Encuesta no encontrada" });
    res.json({ mensaje: "Encuesta eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
