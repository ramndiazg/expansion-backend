const Comentario = require("../models/Comentario");

exports.getAprobadosPorNoticia = async (req, res) => {
  try {
    const comentarios = await Comentario.find({
      noticia: req.params.noticiaId,
      estado: "aprobado",
    })
      .populate("miembro", "nombre")
      .sort({ createdAt: -1 });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const comentario = await Comentario.create({
      noticia: req.body.noticia,
      miembro: req.auth.id,
      texto: req.body.texto,
    });
    res.status(201).json(comentario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPendientes = async (req, res) => {
  try {
    const comentarios = await Comentario.find({ estado: "pendiente" })
      .populate("miembro", "nombre email")
      .populate("noticia", "titulo slug")
      .sort({ createdAt: 1 });
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.moderar = async (req, res) => {
  try {
    const { estado } = req.body; // 'aprobado' | 'rechazado'
    if (!["aprobado", "rechazado"].includes(estado)) {
      return res.status(400).json({ error: "Estado inválido" });
    }
    const comentario = await Comentario.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true },
    );
    if (!comentario)
      return res.status(404).json({ error: "Comentario no encontrado" });
    res.json(comentario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
