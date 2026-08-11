const mongoose = require("mongoose");

const opcionSchema = new mongoose.Schema(
  {
    texto: { type: String, required: true },
    votos: { type: Number, default: 0 },
  },
  { _id: true },
);

const encuestaSchema = new mongoose.Schema(
  {
    pregunta: { type: String, required: true },
    opciones: {
      type: [opcionSchema],
      validate: (v) => Array.isArray(v) && v.length >= 2,
    },
    activa: { type: Boolean, default: true },
    fechaCierre: { type: Date },
    creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Encuesta", encuestaSchema);
