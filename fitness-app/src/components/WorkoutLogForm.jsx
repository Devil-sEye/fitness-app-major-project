import React, { useState } from 'react';

function WorkoutLogForm({ onLogWorkout, onCancel }) {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogWorkout({
      exerciseName,
      sets: parseInt(sets, 10) || 0,
      reps: parseInt(reps, 10) || 0,
      weight: parseFloat(weight) || 0,
      duration, // We might need to handle the format of duration later (e.g., minutes, seconds)
    });
    // Clear the form after submission
    setExerciseName('');
    setSets('');
    setReps('');
    setWeight('');
    setDuration('');
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={onCancel}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Log Workout</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="exerciseName" className="block text-gray-700 text-sm font-bold mb-2">Exercise Name:</label>
            <input
              type="text"
              id="exerciseName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="sets" className="block text-gray-700 text-sm font-bold mb-2">Sets:</label>
            <input
              type="number"
              id="sets"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="reps" className="block text-gray-700 text-sm font-bold mb-2">Reps:</label>
            <input
              type="number"
              id="reps"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-gray-700 text-sm font-bold mb-2">Weight (optional):</label>
            <input
              type="number"
              id="weight"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duration (e.g., 30 minutes, 1 hour):</label>
            <input
              type="text"
              id="duration"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Log Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkoutLogForm;