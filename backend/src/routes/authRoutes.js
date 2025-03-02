const express = require('express');
const router = express.Router();
const {loginController,registerController} = require('../controller/authController');
const {verifyToken,verifyEmail}=require("../middleware/authMiddleware")


router.post("/login",loginController);
router.post("/register",registerController);
router.get("/verify/:token",verifyToken,verifyEmail);


module.exports = router;