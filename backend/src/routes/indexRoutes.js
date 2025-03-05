const express = require("express")
const router = express.Router();
const indexController = require("../controller/indexController")
const {verifyAccessToken} =require("../middleware/authMiddleware")

// index
router.get("/home",verifyAccessToken,indexController.indexGet);
// 404 found sayfası
router.get("/404",indexController.p404Get);

// blank
router.get("/blank",indexController.blankGet);

// 404
router.get("/tables",indexController.tablesGet)

// login
router.get("/login",indexController.loginGet);

// register
router.get("/register",indexController.registerGet);    
// forgot pass
router.get("/forgot-password",indexController.passwordForgetGet);


// boş sayfa 
module.exports =router;