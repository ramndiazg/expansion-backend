const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginUsuario);
router.post("/miembro-login", authController.loginMiembro);

module.exports = router;
