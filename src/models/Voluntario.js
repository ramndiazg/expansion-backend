const mongoose = require("mongoose");

const voluntarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    telefono: { type: String, required: true, trim: true },
    provincia: { type: String, required: true },
    areaInteres: { type: String }, // ej: logística, redes, prensa, campo
    disponibilidad: { type: String }, // ej: fines de semana, tiempo completo
    mensaje: { type: String, maxlength: 500 },
    estado: {
      type: String,
      enum: ["pendiente", "contactado", "activo"],
      default: "pendiente",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Voluntario", voluntarioSchema);
