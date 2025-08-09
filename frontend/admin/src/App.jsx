import React from "react";
import { UserProvider } from "./contexts/UserContext";
import UserManagement from "./components/UserManagement";
import AttendanceMarking from "./components/AttendanceMarking";
import AttendanceReports from "./components/AttendanceReports";

function App() {
  return (
    <UserProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 mb-8 text-center">
          EasyAttend Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-4">
          <UserManagement />
          <AttendanceMarking />
          <AttendanceReports />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
