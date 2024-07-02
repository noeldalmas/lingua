import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    // After dispatching the logout action, you might want to redirect the user to the homepage or login page
    // This can be done using react-router's useHistory hook or any other method depending on your routing setup
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default Logout;
