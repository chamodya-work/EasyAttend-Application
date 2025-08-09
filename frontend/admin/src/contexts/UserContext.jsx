import React, { createContext, useState, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const refreshUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users in context:", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ users, refreshUsers }}>
      {children}
    </UserContext.Provider>
  );
};
