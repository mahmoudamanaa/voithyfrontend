import { useState } from "react";
import classes from "./AuthPages.module.css";
import PatientSignupForm from "../components/forms/PatientSignupForm";
import DoctorSignupForm from "../components/forms/DoctorSignupForm";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupMode, setSignupMode] = useState("Doctor");
  const navigate = useNavigate();

  return (
    <div className={classes.pageContainer}>
      <div className={classes.childContainer}>
        <div className={classes.leftContainer}>
          <img src="/profile.jpg" />
        </div>
        <div className={classes.rightContainer}>
          <h1>Signup as a {signupMode}?</h1>
          <p
            onClick={() =>
              setSignupMode((prevState) =>
                prevState === "Patient" ? "Doctor" : "Patient"
              )
            }
          >
            Switch to {signupMode === "Patient" ? "Doctor" : "Patient"}
          </p>
          {signupMode === "Patient" ? (
            <PatientSignupForm />
          ) : (
            <DoctorSignupForm />
          )}
          <p onClick={() => navigate("/login")}>
            Already have an account? Login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
