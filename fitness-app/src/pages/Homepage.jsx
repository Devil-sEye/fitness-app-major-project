import React from 'react';
import { Link } from 'react-router-dom';
import '../components/HomePage.css';
import WorkoutSummaryCard from '../components/admin/WorkoutSummaryCard'; // Adjust the path as needed
import NutritionSummaryCard from '../components/admin/NutritionSummaryCard'; // Adjust the path as needed
import HealthTipsCard from '../components/admin/HealthTipsCard'; // Adjust the path as needed

function HomePage() {
  const user = null; // Replace with your actual user authentication logic

  // Placeholder data for the home page cards
  const totalWorkouts = 300; // Example total workouts
  const recentWorkouts = [
    { id: 1, name: 'Quick Cardio', userId: 'Guest' },
    { id: 2, name: 'Morning Stretch', userId: 'Guest' },
  ];
  const totalFoodItems = 500; // Example total food items
  const recentMealLogs = [
    { id: 1, foodName: 'Healthy Breakfast', userId: 'Guest' },
    { id: 2, foodName: 'Fruit Snack', userId: 'Guest' },
  ];

  return (
    <main className="container mx-auto py-12">
      <section className="hero text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 animate-fade-in">Welcome to <span className="text-green-500">FitLife</span></h1>
        <p className="text-lg text-gray-700 mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Your journey to a <strong className="font-semibold">healthier, stronger</strong> you starts here!
        </p>
        {!user ? (
          <Link to="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out animate-pulse">
            Get Started
          </Link>
        ) : (
          <Link to={user.isAdmin ? '/admin/dashboard' : '/user/dashboard'} className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out animate-pulse">
            Go to Dashboard
          </Link>
        )}
      </section>

      <section className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8 slide-up">
        <div className="feature-card my-card bg-white dark:bg-gray-800 dark:text-gray-100  rounded-md p-6" style={{ animationDelay: '0.1s' }}>
          <span className="feature-icon text-blue-500 text-3xl mb-2" ><img src="" alt="" srcset="" /></span>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Track Workouts</h2>
          <p className="text-gray-600">Log your daily workouts and monitor your progress over time.</p>
        </div>
        <div className="feature-card my-card bg-white dark:bg-gray-800 dark:text-gray-100  rounded-md p-6" style={{ animationDelay: '0.2s' }}>
          <span className="feature-icon text-blue-500 text-3xl mb-2" ><img src="" alt="" srcset="" /></span>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage Nutrition</h2>
          <p className="text-gray-600">Keep track of your meals and understand your nutritional intake.</p>
        </div>
        <div className="feature-card my-card bg-white dark:bg-gray-800 dark:text-gray-100  rounded-md p-6" style={{ animationDelay: '0.3s' }}>
          <span className="feature-icon text-blue-500 text-3xl mb-2" ><img src="" alt="" srcset="" /></span>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Get Health Tips</h2>
          <p className="text-gray-600">Access valuable health tips and information to guide your wellness journey.</p>
        </div>
      </section>

      <section className="py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Workout Summary Card */}
        <WorkoutSummaryCard totalWorkouts={totalWorkouts} recentWorkouts={recentWorkouts} />

        {/* Nutrition Summary Card */}
        <NutritionSummaryCard totalFoodItems={totalFoodItems} recentMealLogs={recentMealLogs} />

        {/* Health Tips Card */}
        <HealthTipsCard />
      </section>
    </main>
  );
}

export default HomePage;