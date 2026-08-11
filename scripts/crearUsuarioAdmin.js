require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("../src/models/Usuario");

const [, , emailArg, nombreArg, passwordArg, ...flags] = process.argv;
const confirmar = flags.includes("--confirmar");

async function main() {
  if (!emailArg || !nombreArg || !passwordArg) {
    console.log(
      "Uso: node scripts/crearUsuarioAdmin.js <email> <nombre> <password> [--confirmar]",
    );
    process.exit(1);
  }

  console.log(
    "--- Modo:",
    confirmar ? "EJECUCIÓN REAL" : "DRY-RUN (no se guarda nada)",
  );
  console.log("Se creará el usuario:", {
    email: emailArg,
    nombre: nombreArg,
    rol: "admin",
  });

  if (!confirmar) {
    console.log(
      "\nEsto fue una simulación. Vuelve a correr con --confirmar para crearlo de verdad.",
    );
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const usuario = await Usuario.create({
    email: emailArg,
    nombre: nombreArg,
    passwordHash: passwordArg, // el hook del modelo lo hashea automáticamente
    rol: "admin",
    activo: true,
  });
  console.log("Usuario admin creado:", usuario.email);
  await mongoose.disconnect();
}

main();
