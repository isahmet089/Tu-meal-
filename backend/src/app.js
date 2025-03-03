const express = require('express');
const app = express();
const cors =require("cors");
const corsConfig =require("./config/corsConfig");
// ROUTES
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const mealRoutes = require('./routes/mealRoutes');
const rateRoutes = require('./routes/userRateRoutes');


// MIDDLEWARES
app.use(cors(corsConfig.corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/meals',mealRoutes);
app.use('/api/rate',rateRoutes);



module.exports = app;