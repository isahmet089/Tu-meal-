const User =require("../model/User");
const RefreshToken =require("../model/RefreshToken");
const jwt=require("jsonwebtoken");

const getProfile= async(req,res)=>{
    try {
        const {refreshToken} = req.cookies.refreshToken;
        const s = await RefreshToken.findOne({refreshToken});
        const user = await User.findOne(s.userId)
        console.log(user);
        
    } catch (error) {
        
    }
};
module.exports={
    getProfile
}