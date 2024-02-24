import React, { useState } from 'react';

const LoginBox = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform authentication logic here
    // For simplicity, let's just pass the username to the parent component for now
    onLogin(username);
  };

  return (
    <div className="flex items-center justify-center h-32">
      <div className="bg-white p-8 rounded shadow-md w-96">
        
        <label className="block mb-4">
          <span className="text-gray-700">Username:</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
          />
        </label>
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginBox;

