import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_AUTH_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the token decodes to role, or we infer it. 
        // For simple production readiness we store the token.
        // We might parse JWT claims here but for now let's persist auth.
        const role = username === 'admin' ? 'Admin' : 'User'; // Configured in backend
        onLogin({ username, role, token: data.token });
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
       console.error("Login failed", error);
       alert("Login service unavailable");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="px-10 py-8 bg-white shadow-2xl rounded-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <div className="text-center mb-6">
          <div className="text-6xl mb-3">🎓</div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Welcome Back!</h3>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 mt-6 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
