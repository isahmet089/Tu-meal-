const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
   date:{
       type:Date,
       required:true
   },
   mealName:{
       type:String,
       required:true
   },
    calories:{
         type:Number,
         required:true
    },
    avarageRating:{
        type:Number,
        required:true,
        default:0
    },
},{timestamps:true});

module.exports = mongoose.model('Meal',mealSchema);