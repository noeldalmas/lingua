import SignUp from "../components/Auth/Signup";
import LogIn from "../components/Auth/Login";
import { useState } from "react";

const Auth = () => {
  const [showLogIn, setShowLogIn] = useState(true);
  return (
    <div className="auth">
      {showLogIn ? (
        <LogIn setShowLogIn={setShowLogIn} />
      ) : (
        <SignUp setShowLogIn={setShowLogIn} />
      )}
    </div>
  );
};

export default Auth;
