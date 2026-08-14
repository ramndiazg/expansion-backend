const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const { verifyToken, requireRolUsuario } = require("../middleware/auth");

router.get("/", videoController.getAll);
router.get("/:id", videoController.getOne);
router.post(
  "/",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  videoController.create,
);
router.put(
  "/:id",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  videoController.update,
);
router.delete(
  "/:id",
  verifyToken,
  requireRolUsuario("admin", "publicador"),
  videoController.remove,
);

module.exports = router;
