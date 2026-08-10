const express = require("express");
const router = express.Router();
const miembroController = require("../controllers/miembroController");

router.get("/", miembroController.getAll);
router.get("/:id", miembroController.getOne);
router.post("/", miembroController.create);
router.put("/:id", miembroController.update);
router.delete("/:id", miembroController.remove);

module.exports = router;
