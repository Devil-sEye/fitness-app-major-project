import React, { useState } from 'react';
import foodData from '../data/foodData.json'; 
console.log("Food Data:", foodData);



function AddMealForm({ onAddMeal, onCancel }) {
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

        if (value.length < 1) { // Start suggesting after 2 characters
            const filteredSuggestions = foodData.filter(item =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions.slice(0, 5)); // Show the top 5 suggestions
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setFoodItems(suggestion.name);
        setCalories(suggestion.calories);
        setProtein(suggestion.protein);
        setCarbs(suggestion.carbs);
        setFats(suggestion.fats);
        setSuggestions([]);
        setShowSuggestions(false);
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
                                {suggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.name}
                                        className="py-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.name} ({suggestion.calories} Cal, P:{suggestion.protein}, C:{suggestion.carbs}, F:{suggestion.fats})
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