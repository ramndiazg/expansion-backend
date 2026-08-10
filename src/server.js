require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

// Ruta de salud, para confirmar que el servidor y la DB están vivos
app.use("/api/noticias", require("./routes/noticiaRoutes"));
app.use("/api/miembros", require("./routes/miembroRoutes"));
app.use("/api/voluntarios", require("./routes/voluntarioRoutes"));
app.use("/api/eventos", require("./routes/eventoRoutes"));
app.use("/api/encuestas", require("./routes/encuestaRoutes"));
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en puerto ${PORT}`),
    );
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });
