"use strict";

var mongoose = require('mongoose');

var FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  calories: {
    type: Number,
    min: 0,
    "default": 0
  },
  protein: {
    type: Number,
    min: 0,
    "default": 0
  },
  carbs: {
    type: Number,
    min: 0,
    "default": 0
  },
  fat: {
    type: Number,
    min: 0,
    "default": 0
  },
  quantity: {
    type: Number,
    min: 1,
    "default": 1
  },
  unit: {
    type: String,
    trim: true,
    maxlength: 50,
    "default": 'grams'
  }
});
var NutritionLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model

  },
  date: {
    type: Date,
    required: true,
    "default": Date.now
  },
  mealType: {
    type: String,
    required: true,
    trim: true,
    "enum": ['Breakfast', 'Lunch', 'Dinner', 'Snack']
  },
  foodItems: {
    type: [FoodItemSchema],
    "default": []
  },
  totalCalories: {
    type: Number,
    min: 0,
    "default": 0
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true
}); // Optional: Virtual for total macros (protein, carbs, fat)

NutritionLogSchema.virtual('totalMacros').get(function () {
  var totals = {
    protein: 0,
    carbs: 0,
    fat: 0
  };
  this.foodItems.forEach(function (item) {
    totals.protein += item.protein || 0;
    totals.carbs += item.carbs || 0;
    totals.fat += item.fat || 0;
  });
  return totals;
});
var NutritionLog = mongoose.model('NutritionLog', NutritionLogSchema);
module.exports = NutritionLog;