// src/components/Common/PrivateRoute.jsx
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils/authUtils";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = getUserFromLocalStorage();
        if (!user) {
          // Not logged in
          return <Redirect to="/login" />;
        }

        // Check if the user has the required role
        if (roles && roles.indexOf(user.role) === -1) {
          // Role not authorized
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }

        // Authorized
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
