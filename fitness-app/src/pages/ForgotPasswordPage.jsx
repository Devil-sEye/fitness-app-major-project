import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Please check your email for a password reset link.');
        toast.success(data.message || 'Password reset link sent successfully!');
        navigate('/login');
      } else {
        setError(data.message || 'Failed to send password reset email.');
        toast.error(data.message || 'Failed to send password reset email.');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('An error occurred while processing your request.');
      toast.error('An error occurred while processing your request.');
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Forgot Your Password?</h2>
        <p className="text-gray-700 mb-4 text-center">
          Enter your email address below, and we'll send you a link to reset your password.
        </p>
        {message && <p className="text-green-500 mb-4 text-sm text-center">{message}</p>}
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Send Reset Link
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
            </p>
            <p className="text-gray-600 text-sm">
              Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ForgotPasswordPage;