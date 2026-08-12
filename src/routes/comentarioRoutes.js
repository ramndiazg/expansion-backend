const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const {
  verifyToken,
  requireMiembro,
  requireRolUsuario,
} = require("../middleware/auth");

router.get("/noticia/:noticiaId", comentarioController.getAprobadosPorNoticia);
router.get("/mios", verifyToken, requireMiembro, comentarioController.getMios);
router.post("/", verifyToken, requireMiembro, comentarioController.create);
router.get(
  "/pendientes",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  comentarioController.getPendientes,
);
router.put(
  "/:id/moderar",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  comentarioController.moderar,
);

module.exports = router;
