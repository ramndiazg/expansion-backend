const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

router.post("/login", authController.login);
router.put("/cambiar-password", verifyToken, authController.cambiarPassword);

module.exports = router;
