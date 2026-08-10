const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, required: true },
    lugar: { type: String, required: true },
    imagen: { type: String },
    requiereInscripcion: { type: Boolean, default: false },
    cupoMaximo: { type: Number }, // opcional, solo si requiereInscripcion es true
    estado: {
      type: String,
      enum: ["proximo", "realizado", "cancelado"],
      default: "proximo",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Evento", eventoSchema);
