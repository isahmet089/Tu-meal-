
const mangoose = require('mongoose');

const userSchema = new mangoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

},{timestamps:true});
module.exports = mangoose.model('User',userSchema);