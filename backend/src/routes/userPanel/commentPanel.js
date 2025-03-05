const express =require("express");
const router = express.Router();


router.get("/getComment", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("comment/commentGet",{ user: req.session.user });
});
router.get("/deleteComment", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("comment/commentDelete",{ user: req.session.user });
});
router.get("/updateComment", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("comment/commentUpdate",{ user: req.session.user });
});

module.exports= router;