const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    mealName: {
      pilav: {
        type: String,
        required: true,
      },
      corba: {
        type: String,
        required: true,
      },
      tatli: {
        type: String,
        required: false,
        default: null,
      },
      anaYemek: {
        type: String,
        required: true,
      },
    },
    calories: {
      pilav: {
        type: Number,
        required: true,
      },
      corba: {
        type: Number,
        required: true,
      },
      tatli: {
        type: Number,
        required: false,
        default: 0,
      },
      anaYemek: {
        type: Number,
        required: true,
      },
    },
    totalCalories: {
      type: Number,
      required: false,
      default: 0,
    },
    avarageRating: {
      type: Number,
      required: true,
      default: 0,
    },
    totalRating: {
      // Bu alan, sadece o günün menüsüne yapılan toplam puanı tutacak
      type: Number,
      default: 0,
    },
    ratings: [ // Kullanıcıların verdiği puanları burada saklayacağız
      {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          rating: { type: Number, required: true }
      }
  ],
    totalUsersRated: {
      // Bu alan, kaç kullanıcının puan verdiğini tutacak
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", mealSchema);
