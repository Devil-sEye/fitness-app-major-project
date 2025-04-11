const mongoose = require('mongoose');

const NutritionLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
  },
date: {
 type:Date,
  required: true,
  default: Date.now(),
  
  

},

  mealType: {
    type: String,
    required: true,
    trim: true,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], // Example meal types
  },
  foodItems: [{
    name: { type: String, required: true, trim: true, maxlength: 200 },
    calories: { type: Number, min: 0 },
    protein: { type: Number, min: 0 },
    carbs: { type: Number, min: 0 },
    fat: { type: Number, min: 0 },
    quantity: { type: Number, min: 1, default: 1 },
    unit: { type: String, trim: true, maxlength: 50 }, // e.g., "grams", "servings"
  }],
  totalCalories: {
    type: Number,
    min: 0,
  },
  // You might want to add other nutrition-related fields
}, { timestamps: true });

const NutritionLog = mongoose.model('NutritionLog', NutritionLogSchema);

module.exports = NutritionLog;