import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/products", label: "Products", icon: "📦" },
    { path: "/admin/orders", label: "Orders", icon: "📋" },
    { path: "profile", label: "Profile", icon: "👤" },
    { path: "/", label: "Marketplace", icon: "🏪" },
  ];

  return (
    <div className="w-64 bg-slate-800 h-screen shadow-lg fixed top-0 left-0 z-10">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-slate-700 text-white border-r-4 border-cyan-400"
                    : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
