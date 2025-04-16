import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/user/DashBoard1';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NutritionPage from './pages/user/Nutrition1';
import WorkoutPage from './pages/user/WorkoutPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminNutritionPage from './pages/admin/Nutrition';
import AdminWorkoutsPage from './pages/admin/Workouts';
import AdminUsersPage from './pages/admin/users';
import UserProfilePage from './pages/user/UserProfilePage'
import UserSettingsPage from './pages/user/UserSettingsPage';
import UserCustomizationPage from './pages/user/UserCustomizationPage';

import './cursorEffects.js'; // Import your cursor effects file here

import './index.css'; 
import { ToastContainer} from 'react-toastify';
function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'light'; // Default to light if no preference is stored
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <Router>
      
      <div className={`app ${theme}`}> {/* Added theme class here for potential non-Tailwind styles */}
      <Navbar onToggleTheme={toggleTheme} theme={theme} />
       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/nutrition" element={<NutritionPage />} />
          <Route path="/user/workout" element={<WorkoutPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/nutrition" element={<AdminNutritionPage />} />
          <Route path="/admin/workouts" element={<AdminWorkoutsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/user/settings" element={<UserSettingsPage />} />
          <Route path="/user/customize" element={<UserCustomizationPage />} />
           
          
          
         
        </Routes>

      </div>
      <Footer />
    <ToastContainer/>

    </Router>
    
  );
}

export default App;