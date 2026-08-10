const Voluntario = require("../models/Voluntario");

exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.estado) filtro.estado = req.query.estado;
    const voluntarios = await Voluntario.find(filtro).sort({ createdAt: -1 });
    res.json(voluntarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const voluntario = await Voluntario.findById(req.params.id);
    if (!voluntario)
      return res.status(404).json({ error: "Voluntario no encontrado" });
    res.json(voluntario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const voluntario = await Voluntario.create(req.body);
    res.status(201).json(voluntario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const voluntario = await Voluntario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!voluntario)
      return res.status(404).json({ error: "Voluntario no encontrado" });
    res.json(voluntario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const voluntario = await Voluntario.findByIdAndDelete(req.params.id);
    if (!voluntario)
      return res.status(404).json({ error: "Voluntario no encontrado" });
    res.json({ mensaje: "Voluntario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
