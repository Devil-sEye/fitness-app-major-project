import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AddMealForm from '../../components/AddMealForm';
 
import { toast } from 'react-toastify';

function NutritionPage() {
  const [meals, setMeals] = useState([]);
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [proteinGoal, setProteinGoal] = useState(150); // Example goal in grams
  const [carbsGoal, setCarbsGoal] = useState(250);   // Example goal in grams
  const [fatsGoal, setFatsGoal] = useState(70);     // Example goal in grams
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [isEditingGoals, setIsEditingGoals] = useState(false);
  const [newCalorieGoal, setNewCalorieGoal] = useState(calorieGoal);
  const [newProteinGoal, setNewProteinGoal] = useState(proteinGoal);
  const [newCarbsGoal, setNewCarbsGoal] = useState(carbsGoal);
  const [newFatsGoal, setNewFatsGoal] = useState(fatsGoal);

  const handleShowAddMealForm = () => {
    setIsAddingMeal(true);
  };

  const handleCancelAddMealForm = () => {
    setIsAddingMeal(false);
  };

  const handleAddMeal = (newMeal) => {
    if (!newMeal || !newMeal.name || !newMeal.calories) {
    console.error("Invalid meal data:", newMeal);
    toast.error("Please fill in all required fields.");
    return;
    }
    
    const updatedMeals = [...meals, { ...newMeal, id: Date.now() }];
     setMeals(updatedMeals);
     setIsAddingMeal(false);
     toast.success("Meal added successfully!"); // Changed to success and moved here
    };

  const handleEditGoals = () => {
    setIsEditingGoals(true);
  };

  const handleSaveGoals = () => {
    setCalorieGoal(parseInt(newCalorieGoal, 10) || 0);
    setProteinGoal(parseInt(newProteinGoal, 10) || 0);
    setCarbsGoal(parseInt(newCarbsGoal, 10) || 0);
    setFatsGoal(parseInt(newFatsGoal, 10) || 0);
    setIsEditingGoals(false);
    // Here you would typically call an API to save these goals to the backend
  };

  const handleCancelEditGoals = () => {
    setNewCalorieGoal(calorieGoal);
    setNewProteinGoal(proteinGoal);
    setNewCarbsGoal(carbsGoal);
    setNewFatsGoal(fatsGoal);
    setIsEditingGoals(false);
  };

  const totals = useMemo(() => {
    let calories = 0, protein = 0, carbs = 0, fats = 0;
    meals.forEach(meal => {
      calories += meal.calories || 0;
      protein += meal.protein || 0;
      carbs += meal.carbs || 0;
      fats += meal.fats || 0;
    });
    return { calories, protein, carbs, fats };

  }, [meals]);

  const { calories: totalCalories, protein: totalProtein, carbs: totalCarbs, fats: totalFats } = totals;

  const getProgressPercentage = (consumed, goal) => {
    if (goal === 0) return 0;
    const percentage = (consumed / goal) * 100;
    return Math.min(100, Math.max(0, percentage));
     
  };

  const calorieProgress = getProgressPercentage(totalCalories, calorieGoal);
  const proteinProgress = getProgressPercentage(totalProtein, proteinGoal);
  const carbsProgress = getProgressPercentage(totalCarbs, carbsGoal);
  const fatsProgress = getProgressPercentage(totalFats, fatsGoal);

  console.log("Meals:", meals);
  
  console.log("Total Calories:", totalCalories);
  

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Nutrition Tracker</h1>

      {/* Goal Display and Edit Section */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Daily Goals</h2>
          {isEditingGoals ? (
            <div className="space-y-2">
              <div><label className="block text-gray-700 text-sm font-bold mb-1">Calories:</label><input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newCalorieGoal} onChange={(e) => setNewCalorieGoal(e.target.value)} /></div>
              <div><label className="block text-gray-700 text-sm font-bold mb-1">Protein (g):</label><input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newProteinGoal} onChange={(e) => setNewProteinGoal(e.target.value)} /></div>
              <div><label className="block text-gray-700 text-sm font-bold mb-1">Carbs (g):</label><input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newCarbsGoal} onChange={(e) => setNewCarbsGoal(e.target.value)} /></div>
              <div><label className="block text-gray-700 text-sm font-bold mb-1">Fats (g):</label><input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newFatsGoal} onChange={(e) => setNewFatsGoal(e.target.value)} /></div>
              <div className="flex space-x-2">
                <button onClick={handleSaveGoals} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Save Goals</button>
                <button onClick={handleCancelEditGoals} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-gray-600">Calories: <span className="font-semibold text-green-500">{calorieGoal}</span></p>
              <p className="text-gray-600">Protein: <span className="font-semibold text-blue-500">{proteinGoal}g</span></p>
              <p className="text-gray-600">Carbs: <span className="font-semibold text-yellow-500">{carbsGoal}g</span></p>
              <p className="text-gray-600">Fats: <span className="font-semibold text-red-500">{fatsGoal}g</span></p>
            </div>
          )}
        </div>
        {!isEditingGoals && (
          <button onClick={handleEditGoals} className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">Edit Goals</button>
        )}
      </div>

      {/* Calorie Goal and Progress */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Calorie Progress</h2>
        <p className="text-gray-600">Consumed: <span className="font-semibold text-green-500">{totalCalories}</span> / {calorieGoal} calories</p>
        <div className="bg-gray-200 rounded-full h-4 mt-2">
          <div
            className="bg-green-500 rounded-full h-4"
            style={{ width: `${calorieProgress}%` }}
            role="progressbar"
            aria-valuenow={calorieProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{calorieProgress}%</p>
      </div>

      {/* Macronutrient Goals and Progress */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Macronutrient Progress</h2>

        {/* Protein */}
        <div className="mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Protein: <span className="font-semibold text-blue-500">{totalProtein}g</span> / {proteinGoal}g</p>
            <span className="text-sm text-gray-500">{proteinProgress}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 mt-1">
            <div
              className="bg-blue-500 rounded-full h-3"
              style={{ width: `${proteinProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Carbohydrates */}
        <div className="mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Carbs: <span className="font-semibold text-yellow-500">{totalCarbs}g</span> / {carbsGoal}g</p>
            <span className="text-sm text-gray-500">{carbsProgress}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 mt-1">
            <div
              className="bg-yellow-500 rounded-full h-3"
              style={{ width: `${carbsProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Fats */}
        <div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Fats: <span className="font-semibold text-red-500">{totalFats}g</span> / {fatsGoal}g</p>
            <span className="text-sm text-gray-500">{fatsProgress}%</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 mt-1">
            <div
              className="bg-red-500 rounded-full h-3"
              style={{ width: `${fatsProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Today's Meals */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Meals</h2>
        {meals.length === 0 ? (
          <p className="text-gray-600">No meals logged yet today.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {meals.map((meal) => (
              <li key={meal.id} className="py-2 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{meal.name}</h3>
                  <p className="text-gray-600 text-sm">{meal.items}</p>
                  <p className="text-gray-600 text-xs">
                    P: {meal.protein || 0}g, C: {meal.carbs || 0}g, F: {meal.fats || 0}g
                  </p>
                </div>
                <span className="text-gray-700 font-semibold">{meal.calories || 0} kcal</span>
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleShowAddMealForm} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Meal
        </button>
      </div>

      {/* Conditionally render the AddMealForm */}
      {isAddingMeal && (
        <AddMealForm onAddMeal={handleAddMeal} onCancel={handleCancelAddMealForm} />
      )}

      {/* ... other sections ... */}
    </div>
  );
}

// At the end of the file
NutritionPage.propTypes = {
  newMeal: PropTypes.shape({
    name: PropTypes.string.isRequired,
    items: PropTypes.string,
    calories: PropTypes.number.isRequired,
    protein: PropTypes.number,
    carbs: PropTypes.number,
    fats: PropTypes.number,
  }),
};

export default NutritionPage;