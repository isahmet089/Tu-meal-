const User = require("../model/User");
const bcrypt =require("bcryptjs");
const {sendVerificationEmail}=require("../utils/sendEmail");
const jwt=require("jsonwebtoken");
const {accessToken,refreshToken}=require("../config/jwtConfig");
const RefreshToken = require("../model/RefreshToken");
require("dotenv").config();

const generateTokens = (user) => {
  const accessTokenPayload = { email: user.email ,password:user.password };
  const refreshTokenPayload = { id: user.id };

  const newAccessToken = jwt.sign(accessTokenPayload, accessToken.secret, {
    expiresIn: accessToken.expiresIn,
  });

  const newRefreshToken = jwt.sign(refreshTokenPayload, refreshToken.secret, {
    expiresIn: refreshToken.expiresIn,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

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
    return res.status(404).json({message:"şifre yanlış"});
    } 
    //jwt token oluştur
   const tokens =generateTokens(user);

   //save refresh token
   const refreshToken = new RefreshToken({userId:user._id,token:tokens.refreshToken});
    await refreshToken.save();
    res.json({
      message: `Giriş başarılı, hoşgeldin ${user.firstName}`,
      user: user,
      tokens,
      });
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

const refreshTokens = async (req, res) => {
 
  try {
    const oldRefreshToken = req.body.refreshToken;
    let bul = await RefreshToken.findOne({refreshToken: oldRefreshToken});
    console.log(bul);
    
    const id = bul.userId;
    const user = await User.findById(id);
    
    // Remove old refresh token
    await RefreshToken.deleteOne({ refreshToken: oldRefreshToken });

    // Generate new tokens
    const tokens = generateTokens(req.user);

    // Save new refresh token
    const newRefreshToken = new RefreshToken({
      userId: req.user.id,
      refreshToken: tokens.refreshToken
    });
    await newRefreshToken.save();

    res.json(tokens);
  } catch (error) {
    res.status(400).json({ message: error.message ,asda:"asda"});
  }
};

const logout = (req, res) => {
  try {
    const { refreshToken } = req.body;
    RefreshToken.removeToken(refreshToken);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  loginController,
  registerController,
  refreshTokens,
  logout

  
};
