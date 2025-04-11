import React from 'react';

function UserDashboard() {
  // You would typically fetch user-specific data here using useEffect and an API call
  const userData = {
    username: 'User123', // Example username
    lastWorkout: 'Leg Day', // Example last workout
    calorieGoal: 2000, // Example calorie goal
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, {userData.username}!</h2>
          <p className="text-gray-600">Ready to crush your fitness goals today?</p>
        </div>

        {/* Last Workout Card */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Last Workout</h2>
          <p className="text-gray-600">Activity: <span className="font-semibold">{userData.lastWorkout}</span></p>
          {/* You might add more details like date and duration */}
        </div>

        {/* Calorie Goal Card */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Today's Calorie Goal</h2>
          <p className="text-gray-600">Goal: <span className="font-semibold">{userData.calorieGoal}</span> calories</p>
          {/* You might add progress towards the goal */}
        </div>

        {/* You can add more cards for other data like:
          - Workout Summary
          - Nutrition Progress
          - Recent Activity
          - Goals Overview
        */}
      </div>

      {/* Links to other user features */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore Features</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => window.location.href = '/user/workout'} >
            Track Workout
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => window.location.href = '/user/nutrition'} >
            Manage Nutrition

          </button>
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            View Progress
          </button>
          {/* Add more buttons for other features */}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;