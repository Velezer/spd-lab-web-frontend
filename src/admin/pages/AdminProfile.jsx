import React, { useState, useEffect } from "react";
import AuthClient from "../../api/AuthClient";

function AdminProfile({ user, onLogout }) {
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
      <div className="p-8">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800 rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto h-16 w-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
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
              Access Denied
            </h2>
            <p className="text-gray-400">Please log in to view your profile.</p>
          </div>
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
      <div className="p-8">
        <div className="max-w-md mx-auto">
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
      </div>
    );
  }

  const displayData = profileData || user;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Account Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="px-4 py-3 bg-slate-700 rounded-lg text-white font-medium">
                {displayData.name || "N/A"}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="px-4 py-3 bg-slate-700 rounded-lg text-white font-medium">
                {displayData.email}
              </div>
            </div>
            {displayData.id && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  User ID
                </label>
                <div className="px-4 py-3 bg-slate-700 rounded-lg text-white font-medium">
                  {displayData.id}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Admin Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Role
              </label>
              <div className="px-4 py-3 bg-slate-700 rounded-lg text-white font-medium">
                Administrator
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Login
              </label>
              <div className="px-4 py-3 bg-slate-700 rounded-lg text-white font-medium">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-slate-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Actions</h2>
          <div className="flex justify-center">
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
