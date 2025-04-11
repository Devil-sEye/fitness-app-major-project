import React, { useState } from 'react';

function UserSettingsPage() {
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: false,
    sms: false,
  });
  const [unitPreference, setUnitPreference] = useState('metric'); // Example: metric or imperial

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationPreferences(prev => ({
      ...prev,
      [name]: checked,
    }));
    // In a real app, you would also send this update to the backend
  };

  const handleUnitChange = (e) => {
    setUnitPreference(e.target.value);
    // In a real app, you would also send this update to the backend
  };

  const handleSaveSettings = () => {
    // Implement your API call to save user settings
    console.log('Saving settings:', { notificationPreferences, unitPreference });
    alert('Settings saved successfully!'); // Replace with a better notification
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>

      <div className="bg-white shadow-md rounded-md p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Notification Preferences</h2>
        <div className="space-y-2">
          <div>
            <input
              type="checkbox"
              id="emailNotifications"
              name="email"
              checked={notificationPreferences.email}
              onChange={handleNotificationChange}
              className="mr-2"
            />
            <label htmlFor="emailNotifications">Receive email notifications</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="pushNotifications"
              name="push"
              checked={notificationPreferences.push}
              onChange={handleNotificationChange}
              className="mr-2"
            />
            <label htmlFor="pushNotifications">Receive push notifications</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="smsNotifications"
              name="sms"
              checked={notificationPreferences.sms}
              onChange={handleNotificationChange}
              className="mr-2"
            />
            <label htmlFor="smsNotifications">Receive SMS notifications</label>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6 mb-4">
        <h2 className="text-lg font-semibold mb-2">Unit Preferences</h2>
        <div>
          <label htmlFor="unit" className="block text-gray-700 text-sm font-bold mb-2">Preferred Units:</label>
          <select
            id="unit"
            value={unitPreference}
            onChange={handleUnitChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, inches)</option>
          </select>
        </div>
      </div>

      <button onClick={handleSaveSettings} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Save Settings
      </button>
    </div>
  );
}

export default UserSettingsPage;