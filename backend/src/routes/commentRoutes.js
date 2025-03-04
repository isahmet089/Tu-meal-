const express =require("express");
const router =express.Router();
const commetController =require("../controller/commentController")

router.post("/",commetController.userCommentPost);
router.get("/",commetController.userCommentGet);

module.exports=router;