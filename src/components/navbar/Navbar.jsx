import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();

  const onLogoutHandler = () => {
    window.open(`http://localhost:4000/auth/logout`, "_self");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    logout();
  };

  return (
    <nav className={classes.navbar}>
      <h3>
        <Link to={`/${user?.isDoctor ? "doctor" : "patient"}/${user?.userId}`}>
          Profile
        </Link>
      </h3>
      <h1>
        <Link to="/">Voithy</Link>
      </h1>
      <button type="button" onClick={onLogoutHandler}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
