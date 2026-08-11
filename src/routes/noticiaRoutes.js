const express = require("express");
const router = express.Router();
const noticiaController = require("../controllers/noticiaController");
const { verifyToken, requireRolUsuario } = require("../middleware/auth");

router.get("/", noticiaController.getAll);
router.get("/:slug", noticiaController.getOne);
router.post(
  "/",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  noticiaController.create,
);
router.put(
  "/:id",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  noticiaController.update,
);
router.delete(
  "/:id",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  noticiaController.remove,
);

module.exports = router;
