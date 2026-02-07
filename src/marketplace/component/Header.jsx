import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ user }) {
  const navigate = useNavigate();
  return (
    <header className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold text-white cursor-pointer hover:text-cyan-400 transition-colors duration-300"
              onClick={() => navigate("/")}
            >
              MarketPlace
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search product..."
                className="w-full pl-4 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-slate-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
            >
              Home
            </button>
            {user ? (
              <>
                <button
                  onClick={() => navigate("/cart")}
                  className="text-slate-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
                >
                  Cart
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="text-slate-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
                >
                  Orders
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="text-slate-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
                >
                  Profil
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-slate-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-slate-300 hover:text-cyan-400 p-2 transition-colors duration-300">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
