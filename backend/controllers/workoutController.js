const Workout = require('../models/Workout');

// Create a new workout log
exports.createWorkout = async (req, res) => {
  try {
    const { userId, date, type, duration, exercises } = req.body;

    if (!userId || !date || !type || !duration || !exercises) {
      return res.status(400).json({ message: 'All workout fields are required' });
    }

    const newWorkout = new Workout({ userId, date, type, duration, exercises });
    const savedWorkout = await newWorkout.save();

    res.status(201).json({ message: 'Workout created successfully', workout: savedWorkout });
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Failed to create workout' });
  }
};

// Get all workouts for a user
exports.getWorkoutsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId }).select('-__v');
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Failed to fetch workouts' });
  }
};

// Get a single workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const workout = await Workout.findById(workoutId).select('-__v');

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({ message: 'Failed to fetch workout' });
  }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const updatedData = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout updated successfully', workout: updatedWorkout });
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ message: 'Failed to update workout' });
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Failed to delete workout' });
  }
};

// Get workout statistics
exports.getWorkoutStats = async (req, res) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId });
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);

    res.status(200).json({ totalWorkouts, totalDuration });
  } catch (error) {
    console.error('Error fetching workout statistics:', error);
    res.status(500).json({ message: 'Failed to fetch workout statistics' });
  }
};

// Get workout summaries, history, logs, plans, goals, or progress (common structure)
exports.getWorkoutOverview = async (req, res) => {
  try {
    const { userId } = req.params;
    const workouts = await Workout.find({ userId })
      .select('date type duration exercises')
      .sort({ date: -1 });

    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workout overview:', error);
    res.status(500).json({ message: 'Failed to fetch workout overview' });
  }
};

// Get distinct workout types
exports.getWorkoutTypes = async (req, res) => {
  try {
    const { userId } = req.params;
    const types = await Workout.find({ userId }).distinct('type');
    res.status(200).json(types);
  } catch (error) {
    console.error('Error fetching workout types:', error);
    res.status(500).json({ message: 'Failed to fetch workout types' });
  }
};

// Placeholder for recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const recommendations = [
      { type: 'Cardio', duration: 30 },
      { type: 'Strength Training', duration: 45 },
    ];
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Failed to fetch recommendations' });
  }
};

