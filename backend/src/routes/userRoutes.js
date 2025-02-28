const express = require('express');
const router = express();
const {getUsersController,createUserController,updateUserController,deleteUserController} = require('../controller/userController');

router.get("/",getUsersController);
router.post("/",createUserController);
router.put("/:id",updateUserController);
router.delete("/:id",deleteUserController);


module.exports = router;

