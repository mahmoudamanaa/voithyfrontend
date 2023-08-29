import { useState } from "react";
import classes from "./Views.module.css";
import AllDoctors from "./AllDoctors";
import YourDoctors from "./YourDoctors";

const PatientView = () => {
  const [allDoctorsMode, setAllDoctorsMode] = useState(false);

  return (
    <div className={classes.viewContainer}>
      <div className={classes.optionsContainer}>
        <h3 onClick={() => setAllDoctorsMode(true)}>Load all doctors</h3>
        <h3 onClick={() => setAllDoctorsMode(false)}>Load your doctors</h3>
      </div>
      <div className={classes.cardsContainer}>
        {allDoctorsMode ? <AllDoctors /> : <YourDoctors />}
      </div>
    </div>
  );
};

export default PatientView;
