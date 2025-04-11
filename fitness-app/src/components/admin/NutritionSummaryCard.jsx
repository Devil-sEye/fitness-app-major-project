import React from 'react';

function NutritionSummaryCard({ totalFoodItems, recentMealLogs }) {
  return (
    <div className="my-card bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Nutrition Summary</h2>
      <p className="text-3xl font-bold text-orange-500">{totalFoodItems || 0} Food Items</p>
      {recentMealLogs && recentMealLogs.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Meal Logs</h3>
          <ul className="divide-y divide-gray-200">
            {recentMealLogs.slice(0, 3).map(log => ( // Display the last 3 recent meal logs
              <li key={log.id} className="py-2">
                <p className="text-gray-600 text-sm">User ID: {log.userId} - {log.foodName}</p>
                {/* You might want to display the date/time and quantity */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {recentMealLogs && recentMealLogs.length === 0 && (
        <p className="text-gray-600 mt-4">No recent meal logs.</p>
      )}
    </div>
  );
}

export default NutritionSummaryCard;