const express = require("express");
const router = express.Router();
const encuestaController = require("../controllers/encuestaController");
const { verifyToken, requireRolUsuario } = require("../middleware/auth");

router.get("/", encuestaController.getAll);
router.get("/slug/:slug", encuestaController.getBySlug);
router.get("/:id", encuestaController.getOne);
router.post(
  "/",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  encuestaController.create,
);
router.post("/:id/votar/:opcionId", encuestaController.votar);
router.put(
  "/:id/cerrar",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  encuestaController.cerrar,
);
router.delete(
  "/:id",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  encuestaController.remove,
);

module.exports = router;
