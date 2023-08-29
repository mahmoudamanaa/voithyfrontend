import LoginForm from "../components/forms/LoginForm";
import classes from "./AuthPages.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.pageContainer}>
      <div className={classes.childContainer}>
        <div className={classes.leftContainer}>
          <img src="/profile.jpg" />
        </div>
        <div className={classes.rightContainer}>
          <h1>Login</h1>
          <LoginForm />
          <p onClick={() => navigate("/signup")}>Create your account →</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
