import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthClient from "../../api/AuthClient";

function Profile({ user, onLogout }) {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.token) {
        setLoading(false);
        return;
      }

      try {
        const response = await AuthClient.getProfile(user.token);

        if (response.status !== 200) {
          throw new Error("Failed to fetch profile data");
        }

        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-slate-700/50 text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-slate-300">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-slate-700/50 text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-4">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Error Loading Profile
          </h2>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  const displayData = profileData || user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-slate-700/50">
          <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Your Profile</h2>
            <p className="text-slate-300">Manage your account information</p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="px-4 py-3 border-0 rounded-xl bg-slate-700/50 backdrop-blur-sm text-white font-medium">
                  {displayData.name || "N/A"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="px-4 py-3 border-0 rounded-xl bg-slate-700/50 backdrop-blur-sm text-white font-medium">
                  {displayData.email}
                </div>
              </div>
              {displayData.id && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    User ID
                  </label>
                  <div className="px-4 py-3 border-0 rounded-xl bg-slate-700/50 backdrop-blur-sm text-white font-medium">
                    {displayData.id}
                  </div>
                </div>
              )}
            </div>
            <div className="pt-4 space-y-4">
              <button
                onClick={() => navigate("/admin")}
                className="group relative w-full flex justify-center py-4 px-4 border-0 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Admin Panel
              </button>
              <button
                onClick={onLogout}
                className="group relative w-full flex justify-center py-4 px-4 border-0 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
