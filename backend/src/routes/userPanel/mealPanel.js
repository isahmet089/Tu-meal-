const express =require("express");
const router = express.Router();


router.get("/getMeal", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("meals/mealGet",{ user: req.session.user });
});
router.get("/deleteMeal", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("meals/mealDelete",{ user: req.session.user });
});
router.get("/updateMeal", async(req,res)=>{
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render("meals/mealUpdate",{ user: req.session.user });
});

module.exports= router;