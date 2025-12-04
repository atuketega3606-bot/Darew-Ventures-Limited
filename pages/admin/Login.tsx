import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Droplets, Lock, Mail } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darew-blue p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-darew-lightBlue border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl p-8 transition-colors duration-300">
        <div className="text-center mb-8">
          <div className="inline-block bg-darew-gold p-3 rounded-lg mb-4">
            <Droplets className="h-8 w-8 text-darew-blue" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">Admin Portal</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to manage Darew Venture Limited</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-400 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-darew-gold transition-colors"
                placeholder="admin@darew.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-darew-gold transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-darew-gold text-darew-blue font-bold py-3 rounded hover:bg-yellow-500 transition-colors"
          >
            SIGN IN
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-500">
           <p>Demo Credentials:</p>
           <p className="mt-1">Email: admin@darew.com</p>
           <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;