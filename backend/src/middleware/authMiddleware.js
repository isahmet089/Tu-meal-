const jwt = require("jsonwebtoken");
const User =require("../model/User")

const verifyToken = async (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).json({message:"Token gerekli!"});
    }
    // token doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
      res.status(400).json({message:"geçersiz veya süresi dolmuş token!"})
    }
};

// E-posta Doğrulama
const verifyEmail = async (req, res) => {
  try {
    // params üzerinden gelen token'ı al
    const token = req.params.token;

    // Token'ı decode et
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) return res.status(400).json({ message: "Kullanıcı bulunamadı." });
    if (user.isVerified) return res.status(400).json({ message: "Hesap zaten doğrulanmış." });

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: "Hesap başarıyla doğrulandı!" });
  } catch (err) {
    res.status(400).json({ message: "Geçersiz veya süresi dolmuş token." });
  }
};

module.exports={verifyToken,
  verifyEmail
};