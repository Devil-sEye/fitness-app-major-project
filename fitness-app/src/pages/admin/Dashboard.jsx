import React from 'react';
import { Link } from 'react-router-dom';
import WorkoutSummaryCard from '../../components/admin/WorkoutSummaryCard'; // Adjust the path as needed
import NutritionSummaryCard from '../../components/admin/NutritionSummaryCard'; // Adjust the path as needed
import HealthTipsCard from '../../components/admin/HealthTipsCard'; // Adjust the path as needed

function AdminDashboardPage() {
  // Placeholder data - in a real app, you'd fetch this from an API
  const totalUsers = 150;
  const totalWorkouts = 300;
  const totalFoodItems = 500;
  const recentActivity = [
    { id: 1, user: 'JohnDoe', action: 'Logged a workout', time: '5 minutes ago' },
    { id: 2, user: 'JaneSmith', action: 'Updated user profile', time: '15 minutes ago' },
    { id: 3, user: 'AdminUser', action: 'Deleted a workout', time: '30 minutes ago' },
  ];

  // Placeholder data for workout and nutrition summaries
  const recentWorkouts = [
    { id: 1, name: 'Strength Training', userId: 101 },
    { id: 2, name: 'Running', userId: 102 },
    { id: 3, name: 'Yoga', userId: 101 },
  ];
  const recentMealLogs = [
    { id: 1, foodName: 'Chicken Salad', userId: 102 },
    { id: 2, foodName: 'Protein Shake', userId: 101 },
    { id: 3, foodName: 'Oatmeal', userId: 103 },
  ];

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Users Card */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-500">{totalUsers}</p>
        </div>

        {/* Workout Summary Card */}
        <WorkoutSummaryCard totalWorkouts={totalWorkouts} recentWorkouts={recentWorkouts} />

        {/* Nutrition Summary Card */}
        <NutritionSummaryCard totalFoodItems={totalFoodItems} recentMealLogs={recentMealLogs} />

        {/* Recent Activity Card (Keeping this for now) */}
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Recent Activity</h2>
          <ul>
            {recentActivity.map(activity => (
              <li key={activity.id} className="py-2 border-b last:border-b-0">
                <span className="font-semibold text-gray-600">{activity.user}</span> {activity.action} <span className="text-gray-400 text-sm">({activity.time})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Health Tips Card */}
        <HealthTipsCard />
      </div>

      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Admin Navigation</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/admin/users" legacyBehavior>
              <a className="text-blue-500 hover:text-blue-700">Manage Users</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/workouts" legacyBehavior>
              <a className="text-green-500 hover:text-green-700">Manage Workouts</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/nutrition" legacyBehavior>
              <a className="text-orange-500 hover:text-orange-700">Manage Nutrition</a>
            </Link>
          </li>
          {/* Add more links to other admin pages here */}
        </ul>
      </div>

      {/* You can add more sections to the dashboard as needed */}
    </div>
  );
}

export default AdminDashboardPage;