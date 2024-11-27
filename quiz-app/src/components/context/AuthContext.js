import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//login
  const login = async (credentials) => {
    try {
      // Pass the username and password in the request body
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials, // Send credentials object { username, password }
        {
          headers: {
            "Content-Type": "application/json", // Specify the request body content type
          },
        }
      );

      // Assuming the backend responds with a token and user details
      localStorage.setItem("token", data.token); // Store the token
      setUser({ username: credentials.username }); // Set the logged-in user
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };
//register
 // Register function
 const register = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      formData, // Pass { username, email, password }
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Registration successful:", response.data);
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};
//logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ username: "Logged In User" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
