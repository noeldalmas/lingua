// src/hooks/useLogin.jsx
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { apiRequest } from "../utils/api"; // Import the API utility

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiRequest("/users/login", "POST", {
        email,
        password,
      });

      // Save the user to localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Update the user in the context
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.error("Login error", error);
    }
  };
  return { login, error, isLoading };
};
