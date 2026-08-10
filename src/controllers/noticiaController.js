const Noticia = require("../models/Noticia");

exports.getAll = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.estado) filtro.estado = req.query.estado;
    if (req.query.categoria) filtro.categoria = req.query.categoria;
    const noticias = await Noticia.find(filtro).sort({ createdAt: -1 });
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const noticia = await Noticia.findOne({ slug: req.params.slug });
    if (!noticia)
      return res.status(404).json({ error: "Noticia no encontrada" });
    res.json(noticia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const noticia = await Noticia.create(req.body);
    res.status(201).json(noticia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const noticia = await Noticia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!noticia)
      return res.status(404).json({ error: "Noticia no encontrada" });
    res.json(noticia);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const noticia = await Noticia.findByIdAndDelete(req.params.id);
    if (!noticia)
      return res.status(404).json({ error: "Noticia no encontrada" });
    res.json({ mensaje: "Noticia eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
