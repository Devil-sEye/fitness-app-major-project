"use strict";

var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  sets: {
    type: Number,
    min: 1,
    "default": 1
  },
  reps: {
    type: Number,
    min: 1,
    "default": 1
  },
  weight: {
    type: Number,
    min: 0,
    "default": 0
  },
  unit: {
    type: String,
    "enum": ['kg', 'lbs'],
    "default": 'kg'
  }
});
var WorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  date: {
    type: Date,
    required: true,
    "default": Date.now
  },
  type: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  duration: {
    type: Number,
    // in minutes
    required: true,
    min: 1
  },
  exercises: {
    type: [ExerciseSchema],
    "default": []
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  // Optional fields for analytics or user tracking
  intensity: {
    type: String,
    "enum": ['Low', 'Moderate', 'High']
  },
  mood: {
    type: String,
    trim: true,
    maxlength: 50
  }
}, {
  timestamps: true
});
var Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;