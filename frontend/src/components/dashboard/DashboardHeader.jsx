"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { Menu, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";

const DashboardHeader = ({ setSidebarOpen, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="md:hidden rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 md:flex-none">
          <h1 className="text-lg font-semibold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
            <Bell className="h-6 w-6" />
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <img
                className="h-8 w-8 rounded-full"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "User"
                )}&background=0D9488&color=fff&size=32`}
                alt={user?.name}
              />
              <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <button
                  onClick={() => {
                    navigate("/dashboard/profile");
                    setDropdownOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <User className="mr-3 h-4 w-4" />
                  Your Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
