const express = require('express');
const routes = express.Router();
const {dayGetController,weekGetController,createMealController,updateMealController,deleteMealController,getMealController} = require('../controller/mealController');

// GET 
routes.get('/day',dayGetController);
routes.get('/week',weekGetController);

// CRUD
routes.get('/',getMealController);
routes.post('/',createMealController);
routes.put('/:id',updateMealController);
routes.delete('/:id',deleteMealController);

module.exports = routes;