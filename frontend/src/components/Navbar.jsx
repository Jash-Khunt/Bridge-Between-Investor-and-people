"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.jpg";
const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Bridge Logo" className="h-10 w-10" />
              <span className="ml-2 text-xl font-bold text-teal-600">
                Bridge
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              >
                About
              </Link>
              <Link
                to="/advice"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              >
                Advice
              </Link>
              <Link
                to="/loans"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              >
                Loans
              </Link>
              <Link
                to="/contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                >
                  <span>{user?.name}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="rounded-md px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-800"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/advice"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Advice
            </Link>
            <Link
              to="/loans"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Loans
            </Link>
            <Link
              to="/contact"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block rounded-md bg-teal-50 px-3 py-2 text-base font-medium text-teal-700 hover:bg-teal-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
