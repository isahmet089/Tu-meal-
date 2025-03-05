const express =require("express");
const router = express.Router();


router.get("/getUser", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("users/userGet",{ user: req.session.user });
});
router.get("/deleteUser", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("users/userDelete",{ user: req.session.user });
});
router.get("/updateUser", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("users/userUpdate",{ user: req.session.user });
});

module.exports= router;