const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    mealId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Meal'
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    }
},{timestamps:true});

module.exports = mongoose.model('Rating',ratingSchema);
