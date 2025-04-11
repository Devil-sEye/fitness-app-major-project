import React, { useState, useEffect } from 'react';

function AdminWorkoutsPage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/admin/workouts'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWorkouts(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const handleDeleteWorkout = (workoutId) => {
    console.log(`Deleting workout with ID: ${workoutId}`);
    // Implement your API call to delete the workout
    // After successful deletion, update the workouts state:
    // setWorkouts(workouts.filter(workout => workout.id !== workoutId));
  };

  const handleEditWorkout = (workoutId) => {
    console.log(`Editing workout with ID: ${workoutId}`);
    // Implement your logic to edit the workout (e.g., navigate to an edit page or open a modal)
  };

  if (loading) {
    return <div className="container mx-auto py-12">Loading workouts...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-12 text-red-500">Error loading workouts: {error}</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin - Workout Management</h1>

      <div className="mb-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add New Workout
        </button>
      </div>

      <div className="bg-white shadow-md rounded-md overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {workouts.map(workout => (
              <tr key={workout.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {workout.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {workout.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {workout.description}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {workout.category} {/* Assuming your workout data has a category property */}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => handleEditWorkout(workout.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteWorkout(workout.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminWorkoutsPage;