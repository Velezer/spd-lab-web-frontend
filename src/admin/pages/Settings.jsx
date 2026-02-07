import React, { useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    siteName: "My Marketplace",
    email: "admin@example.com",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle save settings
    console.log("Settings saved:", settings);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      <div className="bg-slate-800 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Admin Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="mr-2"
              />
              Enable Notifications
            </label>
          </div>
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded font-semibold"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
