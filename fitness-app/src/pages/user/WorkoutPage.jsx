import React, { useState } from 'react';
import WorkoutLogForm from '../../components/WorkoutLogForm' // Ensure the path is correct

function WorkoutPage() {
  const [isLoggingWorkout, setIsLoggingWorkout] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  const handleShowLogWorkoutForm = () => {
    setIsLoggingWorkout(true);
  };

  const handleCancelLogWorkoutForm = () => {
    setIsLoggingWorkout(false);
  };

  const handleLogWorkout = (newWorkout) => {
    setWorkouts([...workouts, { ...newWorkout, id: Date.now() }]);
    setIsLoggingWorkout(false);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Workout Tracker</h1>

      <button
        onClick={handleShowLogWorkoutForm}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Log Workout
      </button>

      {isLoggingWorkout && (
        <WorkoutLogForm onLogWorkout={handleLogWorkout} onCancel={handleCancelLogWorkoutForm} />
      )}

      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Workout History</h2>
        {workouts.length === 0 ? (
          <p className="text-gray-600">No workouts logged yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {workouts.map((workout) => (
              <li key={workout.id} className="py-4">
                <h3 className="text-lg font-semibold text-gray-700">{workout.exerciseName}</h3>
                <p className="text-gray-600 text-sm">
                  Sets: {workout.sets}, Reps: {workout.reps}, Weight: {workout.weight || 'N/A'}
                </p>
                <p className="text-gray-600 text-sm">Duration: {workout.duration}</p>
                {/* You might want to display the date/time of the workout as well */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WorkoutPage;