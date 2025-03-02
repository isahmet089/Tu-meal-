const User = require("../model/User");
const sendEmail = require("../utils/sendEmail");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Böyle bir kullanıcı bulunamadı" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Hatalı şifre" });
    }
    res.json({ message: `Giriş başarılı, hoşgeldin ${user.firstName}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const registerController = async (req, res,next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User({ firstName, lastName, email, password });
    const newUser = await user.save();

    // Hoş geldiniz e-postası gönder
    try {
      const mailOptions = {
        to: email,
        subject: "Tumeal'a Hoş Geldiniz!",
        html: `<h1>Merhaba, ${firstName}!</h1><p>Kayıt olduğun için teşekkürler. 🎉</p>`,
      };
      await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.html);
      console.log("E-posta başarıyla gönderildi:", mailOptions);
      next();
    } catch (error) {
      console.log("E-posta gönderme hatası:", error);
      next();
    }

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  loginController,
  registerController,
};
