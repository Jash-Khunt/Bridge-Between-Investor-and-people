"use client";

import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { User, Phone, MapPin, Edit2, Save, X } from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const loading = useAuthStore((state) => state.loading);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: {
      city: user?.location?.city || "",
      state: user?.location?.state || "",
      country: user?.location?.country || "India",
    },
  });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      location: {
        city: user?.location?.city || "",
        state: user?.location?.state || "",
        country: user?.location?.country || "India",
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name || "User"
                )}&background=0D9488&color=fff&size=128`}
                alt={user?.name}
                className="mx-auto h-32 w-32 rounded-full"
              />
              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {user?.name}
              </h2>
              <p className="text-sm capitalize text-gray-600">{user?.role}</p>
              <p className="mt-2 text-sm text-gray-500">{user?.email}</p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="mr-2 h-4 w-4" />
                <span>{user?.phone || "Not provided"}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="mr-2 h-4 w-4" />
                <span>
                  {user?.location?.city && user?.location?.state
                    ? `${user.location.city}, ${user.location.state}`
                    : "Location not provided"}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="mr-2 h-4 w-4" />
                <span>
                  Member since{" "}
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Personal Information
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Edit2 className="mr-1 h-4 w-4" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center rounded-md bg-teal-600 px-3 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:bg-teal-400"
                  >
                    {loading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <Save className="mr-1 h-4 w-4" />
                    )}
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
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
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 ${
                      !isEditing ? "bg-gray-50 text-gray-500" : ""
                    }`}
                  />
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
                    value={user?.email || ""}
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email cannot be changed
                  </p>
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
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 ${
                      !isEditing ? "bg-gray-50 text-gray-500" : ""
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={user?.role || ""}
                    disabled
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm capitalize"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Role cannot be changed
                  </p>
                </div>

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
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 ${
                      !isEditing ? "bg-gray-50 text-gray-500" : ""
                    }`}
                  />
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
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 ${
                      !isEditing ? "bg-gray-50 text-gray-500" : ""
                    }`}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
