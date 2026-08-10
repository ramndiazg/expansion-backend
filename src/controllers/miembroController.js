const Miembro = require("../models/Miembro");

exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.estado) filtro.estado = req.query.estado;
    const miembros = await Miembro.find(filtro).sort({ createdAt: -1 });
    res.json(miembros);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const miembro = await Miembro.findById(req.params.id);
    if (!miembro)
      return res.status(404).json({ error: "Miembro no encontrado" });
    res.json(miembro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const miembro = await Miembro.create(req.body);
    res.status(201).json(miembro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const miembro = await Miembro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!miembro)
      return res.status(404).json({ error: "Miembro no encontrado" });
    res.json(miembro);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const miembro = await Miembro.findByIdAndDelete(req.params.id);
    if (!miembro)
      return res.status(404).json({ error: "Miembro no encontrado" });
    res.json({ mensaje: "Miembro eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
