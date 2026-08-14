const mongoose = require("mongoose");

const opcionSchema = new mongoose.Schema(
  {
    texto: { type: String, required: true },
    votos: { type: Number, default: 0 },
  },
  { _id: true },
);

function slugify(texto) {
  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const encuestaSchema = new mongoose.Schema(
  {
    pregunta: { type: String, required: true },
    slug: { type: String, unique: true },
    opciones: {
      type: [opcionSchema],
      validate: (v) => Array.isArray(v) && v.length >= 2,
    },
    activa: { type: Boolean, default: true },
    fechaCierre: { type: Date },
    creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    votantes: [{ type: String }],
  },
  { timestamps: true },
);

encuestaSchema.pre("validate", async function () {
  if (this.slug || !this.pregunta) return;

  const base = slugify(this.pregunta);
  let slug = base;
  let intento = 1;

  while (await mongoose.models.Encuesta.exists({ slug })) {
    slug = `${base}-${intento}`;
    intento++;
  }

  this.slug = slug;
});

module.exports = mongoose.model("Encuesta", encuestaSchema);
