const User = require('../model/User');


const loginController = async (req, res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Böyle bir kullanıcı bulunamadı"});
        }
        if(user.password !== password){
            return res.status(400).json({message:"Hatalı şifre"});
        }
        res.json({message:`Giriş başarılı, hoşgeldin ${user.firstName}`});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
const registerController = async (req, res) => {
    try {
        const {firstName,lastName,email,password} = req.body;
        const user = new User({firstName,lastName,email,password});
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
};
module.exports = {
    loginController,
    registerController
};