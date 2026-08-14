const mongoose = require("mongoose");

const noticiaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    resumen: { type: String, required: true, maxlength: 300 },
    contenido: { type: String, required: true },
    imagenDestacada: { type: String },
    imagenesAdicionales: [{ type: String }],
    categoria: {
      type: String,
      enum: ["comunicado", "actividad", "declaracion", "en_los_medios"],
      required: true,
    },
    autor: { type: String, required: true },
    estado: {
      type: String,
      enum: ["borrador", "publicado"],
      default: "borrador",
    },
    fechaPublicacion: { type: Date },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

noticiaSchema.pre("validate", function () {
  if (!this.slug && this.titulo) {
    this.slug = this.titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

module.exports = mongoose.model("Noticia", noticiaSchema);
