const express = require("express");
const router = express.Router();
const voluntarioController = require("../controllers/voluntarioController");

router.get("/", voluntarioController.getAll);
router.get("/:id", voluntarioController.getOne);
router.post("/", voluntarioController.create);
router.put("/:id", voluntarioController.update);
router.delete("/:id", voluntarioController.remove);

module.exports = router;
