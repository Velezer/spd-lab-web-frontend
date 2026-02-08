import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthClient from "../../api/AuthClient";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await AuthClient.login({ email, password });

      if (response.status !== 200) {
        alert(response.data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", response.data.token);
      onLogin(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-white">🔒</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300">
              Sign in to your account to continue shopping
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-200 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700/50 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-4 px-4 border-0 text-sm font-bold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-gray-300 hover:text-white font-medium transition-colors duration-300"
              >
                Don't have an account?{" "}
                <span className="text-blue-400 font-bold">Sign up here</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
