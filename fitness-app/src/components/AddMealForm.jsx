// Replace with your actual app ID and key
const APP_ID = '3333c332'; // Your Application ID
const APP_KEY = '974aee76ebc26396d8a40e2f3fab1306'; // You can use either of your Application Keys

import React, { useState } from 'react';

function AddMealForm({ onAddMeal, onCancel }) {
    // ... rest of your AddMealForm component code remains the same
    // starting from the useState declarations
    const [mealName, setMealName] = useState('');
    const [foodItems, setFoodItems] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setFoodItems(value);

        if (value.length > 2) { // Start suggesting after 3 characters
            fetch(`https://world.openfoodfacts.org/cgi/suggest.pl?tagtype=ingredients&term=${value}`)
                .then(response => response.json())
                .then(data => {
                    setSuggestions(data); // The API returns an array of suggestions
                    setShowSuggestions(true);
                })
                .catch(error => {
                    console.error("Error fetching food suggestions:", error);
                    setSuggestions([]);
                    setShowSuggestions(false);
                });
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setFoodItems(suggestion);
        setCalories('');
        setProtein('');
        setCarbs('');
        setFats('');
        setSuggestions([]);
        setShowSuggestions(false);

        // Fetch nutritional information using the Nutritionix API
        fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-id': APP_ID,
                'x-app-key': APP_KEY,
            },
            body: JSON.stringify({
                query: suggestion,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.foods && data.foods.length > 0) {
                    const food = data.foods[0]; // Take the first matching food
                    setCalories(food.nf_calories || '');
                    setProtein(food.nf_protein || '');
                    setCarbs(food.nf_total_carbohydrate || '');
                    setFats(food.nf_total_fat || '');
                } else {
                    console.log("Nutritional information not found for:", suggestion);
                    // Optionally show a message to the user
                }
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                // Optionally show an error message to the user
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMeal({
            name: mealName,
            items: foodItems,
            calories: parseInt(calories, 10) || 0,
            protein: parseInt(protein, 10) || 0,
            carbs: parseInt(carbs, 10) || 0,
            fats: parseInt(fats, 10) || 0,
        });
        setMealName('');
        setFoodItems('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFats('');
        onCancel();
    };

    return (
        <div
            className="fixed inset-0 bg-gray-600 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-75 overflow-y-auto h-full w-full z-50"
            onClick={onCancel}
        >
            <div
                className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Add New Meal</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* ... rest of your form JSX */}
                    <div>
                        <label htmlFor="mealName" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Meal Name:
                        </label>
                        <input
                            type="text"
                            id="mealName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:focus:shadow-outline-gray"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="foodItems" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Food Items:
                        </label>
                        <input
                            type="text"
                            id="foodItems"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:focus:shadow-outline-gray"
                            value={foodItems}
                            onChange={handleInputChange}
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className="py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <label htmlFor="calories" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Calories:
                        </label>
                        <input
                            type="number"
                            id="calories"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:focus:shadow-outline-gray"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="protein" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Protein (grams):
                        </label>
                        <input
                            type="number"
                            id="protein"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:focus:shadow-outline-gray"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="carbs" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Carbs (grams):
                        </label>
                        <input
                            type="number"
                            id="carbs"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:focus:shadow-outline-gray"
                            value={carbs}
                            onChange={(e) => setCarbs(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="fats" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                            Fats (grams):
                        </label>
                        <input
                            type="number"
                            id="fats"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:focus:shadow-outline-gray"
                            value={fats}
                            onChange={(e) => setFats(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Meal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMealForm;