import React from 'react';

const healthTips = [
  "Stay hydrated by drinking plenty of water throughout the day.",
  "Aim for at least 30 minutes of moderate-intensity exercise most days of the week.",
  "Prioritize getting 7-9 hours of quality sleep each night.",
  "Eat a balanced diet rich in fruits, vegetables, and whole grains.",
  "Manage stress through relaxation techniques like meditation or deep breathing.",
];

function HealthTipsCard() {
  return (
    <div className="my-card bg- shadow-md rounded-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Health Tips</h2>
      <ul className="list-disc pl-5 text-gray-600">
        {healthTips.map((tip, index) => (
          <li key={index} className="py-1">{tip}</li>
        ))}
      </ul>
      <p className="text-gray-500 mt-4 text-sm">Remember, consistency is key to a healthy lifestyle!</p>
    </div>
  );
}

export default HealthTipsCard;