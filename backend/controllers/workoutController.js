const Workout = require('../models/Workout');

// Controller function to create a new workout log entry
exports.createWorkout = async (req, res) => {
  try {
    const { userId, date, type, duration, exercises } = req.body;

    const newWorkout = new Workout({
      userId,
      date,
      type,
      duration,
      exercises,
    });

    const savedWorkout = await newWorkout.save();

    res.status(201).json({ message: 'Workout created successfully', workout: savedWorkout });

  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Failed to create workout' });
  }
};


 exports.getWorkoutsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const workouts = await Workout.find({ userId });

    if (!workouts) {
      return res.status(404).json({ message: 'No workouts found for this user' });
    }

    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Failed to fetch workouts' });
  };
 }
exports.updateWorkout = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const updatedData = req.body;

    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout updated successfully', workout: updatedWorkout });
  }
  catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ message: 'Failed to update workout' });
  }

};
 exports.deleteWorkout = async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
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
 