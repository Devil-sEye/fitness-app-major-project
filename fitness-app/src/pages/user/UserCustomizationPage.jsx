import React, { useState } from 'react';

function UserCustomizationPage() {
  const [theme, setTheme] = useState('light'); // Example: light, dark
  const [preferredWorkouts, setPreferredWorkouts] = useState([]); // Example: ['Strength', 'Cardio']

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    // In a real app, you might update the application's theme here
  };

  const handleWorkoutPreferenceChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPreferredWorkouts(prev => [...prev, value]);
    } else {
      setPreferredWorkouts(prev => prev.filter(item => item !== value));
    }
    // In a real app, you would also send this update to the backend
  };

  const handleSaveCustomizations = () => {
    // Implement your API call to save user customizations
    console.log('Saving customizations:', { theme, preferredWorkouts });
    alert('Customizations saved successfully!'); // Replace with a better notification
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Customization</h1>

      <div className="bg-white shadow-md rounded-md p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Theme</h2>
        <div>
          <label htmlFor="theme" className="block text-gray-700 text-sm font-bold mb-2">Select Theme:</label>
          <select
            id="theme"
            value={theme}
            onChange={handleThemeChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            {/* Add more themes as needed */}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Preferred Workout Types</h2>
        <div className="space-y-2">
          <div>
            <input
              type="checkbox"
              id="strength"
              name="preferredWorkouts"
              value="Strength"
              checked={preferredWorkouts.includes('Strength')}
              onChange={handleWorkoutPreferenceChange}
              className="mr-2"
            />
            <label htmlFor="strength">Strength Training</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="cardio"
              name="preferredWorkouts"
              value="Cardio"
              checked={preferredWorkouts.includes('Cardio')}
              onChange={handleWorkoutPreferenceChange}
              className="mr-2"
            />
            <label htmlFor="cardio">Cardio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="yoga"
              name="preferredWorkouts"
              value="Yoga"
              checked={preferredWorkouts.includes('Yoga')}
              onChange={handleWorkoutPreferenceChange}
              className="mr-2"
            />
            <label htmlFor="yoga">Yoga</label>
          </div>
          {/* Add more workout preferences */}
        </div>
      </div>

      <button onClick={handleSaveCustomizations} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Save Customizations
      </button>
    </div>
  );
}

export default UserCustomizationPage;