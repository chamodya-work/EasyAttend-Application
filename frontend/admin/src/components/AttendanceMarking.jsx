import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const AttendanceMarking = () => {
  const { users, refreshUsers } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState("");
  const [status, setStatus] = useState("present");
  const [dateTime, setDateTime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    refreshUsers(); // Fetch users on mount
  }, [refreshUsers]);

  const handleMarkAttendance = async () => {
    if (!selectedUser) {
      setError("Please select a user.");
      setTimeout(() => setError(""), 5000);
      return;
    }
    if (!dateTime) {
      setError("Please select a date and time.");
      setTimeout(() => setError(""), 5000);
      return;
    }
    try {
      const fullDateTime = dateTime.replace("T", " ") + ":00"; // Convert to YYYY-MM-DD HH:MM:SS
      await axios.post("http://localhost:3000/api/attendance", {
        user_id: selectedUser,
        date: fullDateTime,
        status,
      });
      setError("");
      setSuccess("Attendance marked successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error marking attendance:", error);
      setError(error.response?.data?.message || "Failed to mark attendance.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="bg-blue-50 py-6 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg
              className="w-10 h-10 text-green-700 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">
              Mark Attendance
            </h2>
          </div>
        </div>
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Record Attendance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition bg-gray-50 hover:bg-white"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="border border-gray-300 p-3 rounded-md bg-gray-50 text-gray-900">
              {new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition bg-gray-50 hover:bg-white"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
            <button
              onClick={handleMarkAttendance}
              className="bg-green-700 text-white p-3 rounded-md hover:bg-green-800 transition font-medium md:col-span-3"
            >
              Mark Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMarking;
