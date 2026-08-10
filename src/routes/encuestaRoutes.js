const express = require("express");
const router = express.Router();
const encuestaController = require("../controllers/encuestaController");

router.get("/", encuestaController.getAll);
router.get("/:id", encuestaController.getOne);
router.post("/", encuestaController.create);
router.post("/:id/votar/:opcionId", encuestaController.votar);
router.delete("/:id", encuestaController.remove);

module.exports = router;
