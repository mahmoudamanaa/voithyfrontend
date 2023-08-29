import classes from "./Views.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import PatientCard from "../cards/PatientCard";

const DoctorView = () => {
  const [patients, setPatients] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const getPatients = async () => {
      const response = await fetch(
        "http://localhost:4000/api/users/mypatients",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      setPatients(data.patients);
    };

    getPatients();
  }, [user.token]);

  return (
    <div className={classes.viewContainer}>
      <div className={classes.optionsContainer}>
        <h3>Your Patients</h3>
      </div>
      <div className={classes.cardsContainer}>
        {!patients || patients.length === 0 ? <p>No Results Found.</p> : null}
        {patients.map((patient) => (
          <PatientCard key={patient._id} patient={patient} />
        ))}
      </div>
    </div>
  );
};

export default DoctorView;
