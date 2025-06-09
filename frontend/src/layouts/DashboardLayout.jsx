"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Sidebar from "../components/dashboard/Sidebar";
import MobileSidebar from "../components/dashboard/MobileSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex h-screen bg-gray-100">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        userRole={user?.role}
      />

      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar userRole={user?.role} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader setSidebarOpen={setSidebarOpen} user={user} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
