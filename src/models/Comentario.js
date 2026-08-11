const mongoose = require("mongoose");

const comentarioSchema = new mongoose.Schema(
  {
    noticia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Noticia",
      required: true,
    },
    miembro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Miembro",
      required: true,
    },
    texto: { type: String, required: true, maxlength: 1000 },
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Comentario", comentarioSchema);
