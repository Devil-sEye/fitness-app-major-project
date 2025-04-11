const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    
  },
  type: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
    min: 1,
  },
  exercises: [{
    name: { type: String, required: true, trim: true, maxlength: 100 },
    sets: { type: Number, min: 1 },
    reps: { type: Number, min: 1 },
    weight: { type: Number },
    unit: { type: String, enum: ['kg', 'lbs'] }, // Example unit
  }],
  // You might want to add other workout-related fields
}, { timestamps: true });

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;