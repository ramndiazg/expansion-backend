const express = require("express");
const router = express.Router();
const noticiaController = require("../controllers/noticiaController");

router.get("/", noticiaController.getAll);
router.get("/:slug", noticiaController.getOne);
router.post("/", noticiaController.create);
router.put("/:id", noticiaController.update);
router.delete("/:id", noticiaController.remove);

module.exports = router;
