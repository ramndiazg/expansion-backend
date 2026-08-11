const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true }, // se recibe en texto plano, este hook lo hashea
    rol: { type: String, enum: ["admin", "publicador"], required: true },
    activo: { type: Boolean, default: true },
  },
  { timestamps: true },
);

usuarioSchema.pre("save", async function () {
  if (this.isModified("passwordHash")) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
