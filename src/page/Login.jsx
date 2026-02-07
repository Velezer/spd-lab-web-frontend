import React, { useState } from "react";

function Login({ onSwitchToRegister, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://spd-lab-backend-db797613f87b.herokuapp.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      onLogin(data);
    } catch (error) {
      console.error(error);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome Back!
            </h2>
            <p className="text-white/80">
              Sign in to your account to continue shopping
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  📧 Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-0 rounded-xl bg-white/20 backdrop-blur-sm placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition-all duration-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/90 mb-2"
                >
                  🔒 Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 border-0 rounded-xl bg-white/20 backdrop-blur-sm placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/30 transition-all duration-300"
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
                className="group relative w-full flex justify-center py-4 px-4 border-0 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : "🚀 Sign In"}
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-white/80 hover:text-white font-medium transition-colors duration-300"
              >
                Don't have an account?{" "}
                <span className="text-yellow-400 font-bold">Sign up here</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
