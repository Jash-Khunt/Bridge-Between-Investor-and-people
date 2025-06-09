"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    location: {
      city: "",
      state: "",
      country: "India",
    },
  });
  const [errors, setErrors] = useState({});
  const signup = useAuthStore((state) => state.signup);
  const loading = useAuthStore((state) => state.loading);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.location.city) {
      newErrors["location.city"] = "City is required";
    }

    if (!formData.location.state) {
      newErrors["location.state"] = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await signup(formData);
        navigate("/dashboard");
      } catch (error) {
        console.error("Signup error:", error);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-gray-600">
            Join our community and start connecting
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900">
                Personal Information
              </h3>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.phone ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  I am a...
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.role ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                >
                  <option value="">Select your role</option>
                  <option value="entrepreneur">Entrepreneur</option>
                  <option value="investor">Investor</option>
                  <option value="banker">Banker</option>
                  <option value="advisor">Advisor</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>
            </div>

            {/* Location and Password */}
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-gray-900">
                Location & Security
              </h3>

              <div>
                <label
                  htmlFor="location.city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="location.city"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors["location.city"]
                      ? "border-red-300"
                      : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                />
                {errors["location.city"] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors["location.city"]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location.state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="location.state"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors["location.state"]
                      ? "border-red-300"
                      : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                />
                {errors["location.state"] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors["location.state"]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-teal-400"
            >
              {loading ? <LoadingSpinner size="sm" /> : "Create Account"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
