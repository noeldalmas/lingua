import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove the user from localStorage
    localStorage.removeItem("user");

    // Remove the user from the context
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
