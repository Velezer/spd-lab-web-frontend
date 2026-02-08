import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

function AdminLayout() {
  return (
    <div className="h-screen bg-slate-900 flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
