import React, { useState, useEffect } from 'react';

function AdminNutritionPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('/nutrition/foods'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFoods(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleDeleteFood = (foodId) => {
    console.log(`Deleting food with ID: ${foodId}`);
    // Implement your API call to delete the food item
    // After successful deletion, update the foods state:
    setFoods(foods.filter(food => food.id !== foodId));
  };

  const handleEditFood = (foodId) => {
    console.log(`Editing food with ID: ${foodId}`);
    // Implement your logic to edit the food item (e.g., navigate to an edit page or open a modal)
  };

  const handleAddFood = () => {
    console.log('Adding new food');
    // Implement logic to open a form for adding a new food item
  };

  if (loading) {
    return <div className="container mx-auto py-12">Loading food data...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-12 text-red-500">Error loading food data: {error}</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin - Nutrition Management</h1>

      <div className="mb-4">
        <button onClick={handleAddFood} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add New Food
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
                Calories
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Protein (g)
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Carbs (g)
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fats (g)
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {foods.map(food => (
              <tr key={food.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {food.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {food.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {food.calories}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {food.protein}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {food.carbs}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {food.fats}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button onClick={() => handleEditFood(food.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteFood(food.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

export default AdminNutritionPage;
