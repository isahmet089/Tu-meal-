const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const {verifyToken,verifyEmail, verifyRefreshToken}=require("../middleware/authMiddleware")


router.post("/login",authController.loginController);
router.post("/register",authController.registerController);
router.post("/refresh-token",verifyRefreshToken,authController.refreshTokens);
router.get("/verify/:token",verifyToken,verifyEmail);

router.post("/logout",authController.logout)

module.exports = router;