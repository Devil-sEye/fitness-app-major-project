"use strict";

var express = require('express');

var mongoose = require('mongoose');

var colors = require('colors');

require('dotenv').config();

var userController = require('./controllers/userController'); // Import the user controller


var nutritionController = require('./controllers/nutritionController'); // Import the nutrition controller


var workoutController = require('./controllers/workoutController'); // Import the workout controller


var app = express();
var port = process.env.PORT || 5000; // Middleware to parse JSON request bodies

app.use(express.json());
mongoose.connect(process.env.MONGO_URI).then(function () {
  return console.log('MongoDB connected successfully!'.red);
})["catch"](function (err) {
  return console.error('MongoDB connection error:'.bgBlue, err);
});
app.get('/', function (req, res) {
  res.send('Hello from the Fitness backend!');
}); // Route for user registration

app.post('/api/register', userController.registerUser); //app.post('/api/login', userController.loginUser); // Route for user login
//app.get('/api/users', userController.getAllUsers); // Route to get all users

app.post('/api/nutrition', nutritionController.createNutritionLog); // Route to create a nutrition log

app.get('/api/nutrition/:userId', nutritionController.getNutritionLogsByUser); // Route to get nutrition logs by user ID

app.put('/api/nutrition/:logId', nutritionController.updateNutritionLog); // Route to update a nutrition log

app["delete"]('/api/nutrition/:logId', nutritionController.deleteNutritionLog); // Route to delete a nutrition log

app.post('/api/workout', workoutController.createWorkout); // Route to create a workout log

app.get('/api/workout/:userId', workoutController.getWorkoutsByUser); // Route to get workouts by user ID

app.put('/api/workout/:workoutId', workoutController.updateWorkout); // Route to update a workout log

app["delete"]('/api/workout/:workoutId', workoutController.deleteWorkout); // Route to delete a workout log
// Start the server

app.listen(port, function () {
  console.log("Server is running on port ".concat(port).green);
  return console.log("Server is running on port ".concat(port).green);
});