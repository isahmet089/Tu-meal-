
module.exports={
    accessToken:{
        secret:process.env.JWT_SECRET || "123456789",
        expiresIn:"1m",//kısa ömür
    },
    refreshToken:{
        secret:process.env.JWT_SECRET || "1234567891",
        expiresIn:"7d",//uzun ömür
    },
    verifyEmailToken :{
        secret:process.env.JWT_SECRET || "12345678912",
        expiresIn:"1d",//uzun ömür
    },
    
};