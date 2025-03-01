const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const mealRoutes = require('./routes/mealRoutes');

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ROUTES
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/meals',mealRoutes);



module.exports = app;