import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import Button from "./Button";
import { useAuthContext } from "../../hooks/useAuthContext";
import "../../styles/Header.css";

function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/">
          <img src="logo.png" alt="logo" className="logo-img" />
        </NavLink>
        <nav className="nav-links">
          <ul>
            {!user && (
              <>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/about">About</NavLink>
              </>
            )}
            {user && (
              <>
                <li>
                  <span>{user.email} </span>
                  <Button onClick={handleLogout} label="Log out" />
                </li>
              </>
            )}
            {!user && (
              <li>
                <NavLink to="/auth">
                  <Button label="Login / Register" />
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
