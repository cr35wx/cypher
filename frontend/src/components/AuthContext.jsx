import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const TOKEN_EXPIRATION_CHECK_INTERVAL = 15 * 60 * 1000; // check every 15 minutes
  //const TOKEN_EXPIRATION_CHECK_INTERVAL = 15 * 1000; if u set access token to expire at 1 min, refresh occurs 15 secs (just for testing)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      fetchUserEmail() // Fetch email if token exists
      fetchUserRole();
      checkTokenExpiration();
    }; 
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(checkTokenExpiration, TOKEN_EXPIRATION_CHECK_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

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

  const fetchUserRole = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.is_student ? "student" : decodedToken.is_client ? "client" : "");
    }
  };

  const login = (token, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh_token", refreshToken);
    setIsLoggedIn(true);
    fetchUserEmail(); // Fetch user email upon login
    checkTokenExpiration();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("accountDetails");
    setIsLoggedIn(false);
    setUserEmail(""); // Clear user email upon logout
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        refreshToken();
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('refresh_token')}`,
        },
      });
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('token', data.access_token); 
        fetchUserEmail();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      logout();
    } 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userEmail, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

