const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    sectorInteres: { type: String },
    passwordHash: { type: String, required: true }, // texto plano al crear, el hook lo hashea
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente",
    },
  },
  { timestamps: true },
);

miembroSchema.pre("save", async function () {
  if (this.isModified("passwordHash")) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
});

module.exports = mongoose.model("Miembro", miembroSchema);
