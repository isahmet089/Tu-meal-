const User = require("../model/User");
const bcrypt =require("bcryptjs");
const {sendVerificationEmail,sendEmail}=require("../utils/sendEmail");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // email eşleme
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Böyle bir kullanıcı bulunamadı" });
    }
    //şifre eşleme
    const validPassword= await bcrypt.compare(password,user.password);
    if (!validPassword) {
      console.log(password,validPassword);
      
    return res.status(404).json({message:"şifre yanlış"})
    } 
    res.json({ message: `Giriş başarılı, hoşgeldin ${user.firstName}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const registerController = async (req, res,next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // email konnrolu yapıldı
    const validEmail = await User.findOne({email:req.body.email});
    if (validEmail) {
      return res.status(400).json({message:"boyle bir kullanıcı zaten var!"})
    }
    //şifre hashleme
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password,salt)
    // verify token hazırlanısı
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    // veri db ye gider
    const user = new User({ firstName, lastName, email, password:hashedPassword ,verificationToken });
    const newUser = await user.save();
    // verify edileme maili

    try {
      await sendVerificationEmail(email, verificationToken);
      console.log("basaşalı token maili gönderildi"); 
    } catch (error) {
      console.log("basarısız");
    }
    // Hoş geldiniz e-postası gönder
    // try {
    //   await sendEmail(email,firstName);
    //   console.log("E-posta başarıyla gönderildi:",email);
    // } catch (error) {
    //   console.log("E-posta gönderme hatası:", error);
    // }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



module.exports = {
  loginController,
  registerController

  
};
