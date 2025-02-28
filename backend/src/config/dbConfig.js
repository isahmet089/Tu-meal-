const mongoose = require("mongoose");
const connectDB = async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://fatih123640:XYtaB1n9BStxNQow@cluster1.7jhqj.mongodb.net/tu-meal");
        console.log(`Mongo db bağlantısı başarılı  ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB bağlantısı başarısız ${error.message}`);
        process.exit(1);
    }
};
module.exports=connectDB;