import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';

const LoginPage = () => {

  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with: ", { username, password });
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-4">
      <div className="w-full max-w-md sm:max-w-sm p-4 sm:p-4 bg-transparent shadow-none">
        {/* Login Form */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none mb-4"
          >
            Login
          </button>
        </form>

        {/* Horizontal Line */}
        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-blue-500"></div>
          <span className="mx-2 text-blue-500">OR</span>
          <div className="flex-grow border-t border-blue-500"></div>
        </div>

        {/* Continue with Google Button */}
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
