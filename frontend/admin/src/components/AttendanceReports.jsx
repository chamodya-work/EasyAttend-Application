import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const AttendanceReports = () => {
  const { users, refreshUsers } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    refreshUsers(); // Fetch users on mount
  }, [refreshUsers]);

  const fetchAttendance = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/attendance/user/${userId}`
      );
      setAttendance(response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch attendance.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="bg-blue-50 py-6 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <svg
              className="w-10 h-10 text-indigo-700 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">
              Attendance Reports
            </h2>
          </div>
        </div>
        {error && (
          <div className="fixed top-6 right-6 bg-red-600 text-white px-6 py-3 rounded-md shadow-lg z-50 animate-fade-in">
            {error}
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            View Attendance
          </h3>
          <select
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              if (e.target.value) {
                fetchAttendance(e.target.value);
              } else {
                setAttendance([]);
              }
            }}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition bg-gray-50 hover:bg-white w-full max-w-md"
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 text-indigo-800">
                <th className="p-4 font-semibold">Date & Time</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((record, index) => (
                  <tr
                    key={record.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-100 transition`}
                  >
                    <td className="p-4 text-gray-900">
                      {formatDate(record.created_at)}
                    </td>
                    <td className="p-4 text-gray-900">
                      {record.status ? record.status.toUpperCase() : "UNKNOWN"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-4 text-center text-gray-500">
                    No attendance records found. Select a user to view records.
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

export default AttendanceReports;
