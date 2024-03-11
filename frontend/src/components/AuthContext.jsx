import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) fetchUserEmail(); // Fetch email if token exists
  }, []);

  const fetchUserEmail = () => {
    fetch("/whoami", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data.error && data.account_details.email) {
        setUserEmail(data.account_details.email);
      }
    })
    .catch((error) => console.error("Error fetching user email:", error));
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    fetchUserEmail(); // Fetch user email upon login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserEmail(""); // Clear user email upon logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

