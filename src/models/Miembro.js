const mongoose = require("mongoose");

const miembroSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    cedula: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    telefono: { type: String, required: true, trim: true },
    provincia: { type: String, required: true },
    municipio: { type: String },
    sectorInteres: { type: String }, // ej: juventud, mujeres, comunicaciones, etc.
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Miembro", miembroSchema);
