import classes from "./Cards.module.css";
import { useNavigate } from "react-router-dom";

const PatientCard = ({ patient }) => {
  const { username, email, _id } = patient;

  const navigate = useNavigate();

  return (
    <div
      className={classes.cardContainer}
      onClick={() => navigate(`/patient/${_id}`)}
    >
      <div className={classes.topContainer}>
        <img src="/profile.jpg" />
      </div>
      <div className={classes.bottomContainer}>
        <h1>{username}</h1>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default PatientCard;
