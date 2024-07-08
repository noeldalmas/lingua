import { createContext, useReducer, useEffect } from "react";

// Create a context for authentication state
export const AuthContext = createContext();

// Reducer function to handle authentication actions
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": // Handle login action
      return { user: action.payload };
    case "LOGOUT": // Handle logout action
      return { user: null };
    default: // Return current state for any unknown actions
      return state;
  }
};

// Context provider component to wrap around children components
export const AuthContextProvider = ({ children }) => {
  // Use useReducer hook to manage auth state based on actions
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // Effect to check for user in localStorage and auto-login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user }); // Auto-login if user data exists
    }
  }, []);

  // Log current auth state for debugging
  console.log("AuthContext state: ", state);

  // Provide auth state and dispatch method to children
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
