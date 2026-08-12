const express = require("express");
const router = express.Router();
const miembroController = require("../controllers/miembroController");
const { verifyToken, requireRolUsuario } = require("../middleware/auth");

// Cualquiera puede afiliarse (crear su solicitud)
router.post("/", miembroController.create);

// Todo lo demás — ver datos de personas, aprobar, editar, eliminar — solo Admin
router.get(
  "/",
  verifyToken,
  requireRolUsuario("admin"),
  miembroController.getAll,
);
router.get(
  "/:id",
  verifyToken,
  requireRolUsuario("admin"),
  miembroController.getOne,
);
router.put(
  "/:id",
  verifyToken,
  requireRolUsuario("admin"),
  miembroController.update,
);
router.delete(
  "/:id",
  verifyToken,
  requireRolUsuario("admin"),
  miembroController.remove,
);

module.exports = router;
