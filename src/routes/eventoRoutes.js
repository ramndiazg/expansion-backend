const express = require("express");
const router = express.Router();
const eventoController = require("../controllers/eventoController");

router.get("/", eventoController.getAll);
router.get("/:id", eventoController.getOne);
router.post("/", eventoController.create);
router.put("/:id", eventoController.update);
router.delete("/:id", eventoController.remove);

module.exports = router;
