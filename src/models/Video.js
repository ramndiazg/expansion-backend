const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true },
    estado: {
      type: String,
      enum: ["borrador", "publicado"],
      default: "borrador",
    },
    fechaPublicacion: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Video", videoSchema);
