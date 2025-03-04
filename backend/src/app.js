const express = require('express');
const app = express();
const cors =require("cors");
const corsConfig =require("./config/corsConfig");
const cookieParser=require("cookie-parser")
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const morgan =require("morgan")


// MIDDLEWARES
app.use(cors(corsConfig.corsOption));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(logger);
app.use(morgan("dev"));


// ROUTES
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const mealRoutes = require('./routes/mealRoutes');
const rateRoutes = require('./routes/userRateRoutes');
const commentRoutes =require('./routes/commentRoutes');



// ROUTES
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/meals',mealRoutes);
app.use('/api/rate',rateRoutes);
app.use('/api/comment',commentRoutes);


app.use(errorHandler);

module.exports = app;