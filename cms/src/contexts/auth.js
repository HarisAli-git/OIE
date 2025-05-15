"use client"; // Make sure this is at the top if used in the App Router

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To prevent flicker on initial load
  const router = useRouter();

  useEffect(() => {
    // Check for a token or session in localStorage on initial load
    const token = localStorage.getItem("cms_auth_token");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in a real app, you'd call an API
    if (email === "admin@example.com" && password === "password") {
      setIsAuthenticated(true);
      localStorage.setItem("cms_auth_token", "mock_token"); // Store a mock token
      router.push("/dashboard");
      return true;
    }
    alert("Invalid credentials");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("cms_auth_token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
