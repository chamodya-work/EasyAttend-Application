import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const UserManagement = () => {
  const { users, refreshUsers } = useContext(UserContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "intern",
    group_id: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    refreshUsers(); // Fetch users on mount
  }, [refreshUsers]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/users", form);
      await refreshUsers(); // Refresh users after adding
      setForm({
        name: "",
        email: "",
        password: "",
        role: "intern",
        group_id: "",
      });
      setError("");
      setSuccess("User added successfully!");
      setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to add user. Please try again."
      );
      setTimeout(() => setError(""), 5000); // Clear error after 5 seconds
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <svg
              className="w-10 h-10 text-blue-700 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">
              User Management
            </h2>
          </div>
        </div>

        {/* Toast Notifications */}
        {success && (
          <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in">
            {success}
          </div>
        )}
        {error && (
          <div className="fixed top-6 right-6 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Add New User
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleInputChange}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white"
            >
              <option value="intern">Intern</option>
              <option value="group_leader">Group Leader</option>
              <option value="super_leader">Super Leader</option>
            </select>
            <input
              type="number"
              name="group_id"
              value={form.group_id}
              onChange={handleInputChange}
              placeholder="Group ID"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-700 text-white p-3 rounded-md hover:bg-blue-800 transition font-medium md:col-span-3"
            >
              Add User
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50 text-blue-800">
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Group ID</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-100 transition`}
                  >
                    <td className="p-4 text-gray-900">{user.name}</td>
                    <td className="p-4 text-gray-900">{user.email}</td>
                    <td className="p-4 text-gray-900">
                      {user.role.replace("_", " ").toUpperCase()}
                    </td>
                    <td className="p-4 text-gray-900">
                      {user.group_id || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No users found. Add a user to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
