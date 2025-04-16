import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const users = [
  { username: 'user1', password: '004530', role: 'user' },
  { username: 'user2', password: '987654321', role: 'user' },
  { username: 'admin', password: 'admin123', role: 'admin' }
];

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      toast.success(`Login successful as ${user.role}`);
      localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user session
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } else {
      setError('Invalid username or password');
      toast.error('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Clear user session
    toast.info('You have been logged out');
    navigate('/login'); // Redirect to login page
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Login to <span className="text-green-500">FitLife</span>
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
            <p className="text-gray-600 text-sm">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">Forgot Password?</Link>
            </p>
          </div>
        </form>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
        >
          Logout
        </button>
      </section>
    </main>
  );
}

export default LoginPage;