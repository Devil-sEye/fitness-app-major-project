import React from 'react';

function WorkoutSummaryCard({ totalWorkouts, recentWorkouts }) {
  return (
    <div className="my-card bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Workout Summary</h2>
      <p className="text-3xl font-bold text-green-500">{totalWorkouts || 0} Total Workouts</p>
      {recentWorkouts && recentWorkouts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Workouts</h3>
          <ul className="divide-y divide-gray-200">
            {recentWorkouts.slice(0, 3).map(workout => ( // Display the last 3 recent workouts
              <li key={workout.id} className="py-2">
                <p className="text-gray-600 text-sm">{workout.name} - Logged by User ID: {workout.userId}</p>
                {/* You might want to display the date/time as well */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {recentWorkouts && recentWorkouts.length === 0 && (
        <p className="text-gray-600 mt-4">No recent workouts logged.</p>
      )}
    </div>
  );
}

export default WorkoutSummaryCard;