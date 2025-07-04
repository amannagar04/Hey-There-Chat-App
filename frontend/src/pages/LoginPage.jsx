import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
    <div className="flex h-screen justify-center items-center bg-amber-100">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-sm flex flex-col items-center">
        
        <h2 className="text-3xl font-bold text-amber-700 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 p-3 rounded-md w-full"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 p-3 rounded-md w-full"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <button
            type="submit"
            disabled={isLoggingIn}
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-amber-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>

  )
}

export default LoginPage
