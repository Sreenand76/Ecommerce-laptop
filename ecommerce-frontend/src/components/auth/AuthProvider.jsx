import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define the initial state for the user
const initialState = {
  user: {
    email: null,
    role: null,
  },
  isLoggedIn: false,
};

// Define the actions
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Reducer function to handle state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          email: action.payload.email,
          role: action.payload.role,
        },
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: { email: null, role: null },
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

// Create the context
export const AuthContext = createContext();

// AuthProvider component to wrap the app and provide the context
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize state from localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = parseJwt(token);
      if (decodedUser) {
        const email = localStorage.getItem("email") || decodedUser.sub; // Use `sub` from token if missing
        const role = localStorage.getItem("role") || decodedUser.roles; // Use `roles` from token if missing

        dispatch({
          type: LOGIN,
          payload: { email, role },
        });

        // Ensure localStorage is consistent
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
      }
    }
  }, []);

  // Function to parse JWT token
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  // Function to handle login
  const handleLogin = (token) => {
    const decodedUser = parseJwt(token);
    if (decodedUser) {
      console.log("Decoded User:", decodedUser);

      const email = decodedUser.sub;
      const role = decodedUser.roles;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      // Dispatch login action
      dispatch({
        type: LOGIN,
        payload: { email, role },
      });
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ state, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};