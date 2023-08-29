import classes from "./Cards.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const { username, email, specialization, _id } = doctor;

  const navigate = useNavigate();

  const { user, dispatch } = useAuthContext();

  const doctorIdExists = user.doctors?.find((doctor) => doctor === _id);

  const onSubscribeHandler = async () => {
    const response = await fetch(
      `http://localhost:4000/api/users/subscribe/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "PATCH",
      }
    );

    const json = await response.json();

    localStorage.setItem(
      "user",
      JSON.stringify({
        token: user.token,
        userId: json.updatedPatient._id,
        username: json.updatedPatient.username,
        doctors: json.updatedPatient.doctors,
        email: json.updatedPatient.email,
        isDoctor: json.updatedPatient.isDoctor,
        isPatient: json.updatedPatient.isPatient,
      })
    );

    dispatch({
      type: "LOGIN",
      payload: {
        token: user.token,
        userId: json.updatedPatient._id,
        username: json.updatedPatient.username,
        doctors: json.updatedPatient.doctors,
        email: json.updatedPatient.email,
        isDoctor: json.updatedPatient.isDoctor,
        isPatient: json.updatedPatient.isPatient,
      },
    });
  };

  const onUnsubscribeHandler = async () => {
    const response = await fetch(
      `http://localhost:4000/api/users/unsubscribe/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        method: "PATCH",
      }
    );

    const json = await response.json();

    localStorage.setItem(
      "user",
      JSON.stringify({
        token: user.token,
        userId: json.updatedPatient._id,
        username: json.updatedPatient.username,
        doctors: json.updatedPatient.doctors,
        email: json.updatedPatient.email,
        isDoctor: json.updatedPatient.isDoctor,
        isPatient: json.updatedPatient.isPatient,
      })
    );

    dispatch({
      type: "LOGIN",
      payload: {
        token: user.token,
        userId: json.updatedPatient._id,
        username: json.updatedPatient.username,
        doctors: json.updatedPatient.doctors,
        email: json.updatedPatient.email,
        isDoctor: json.updatedPatient.isDoctor,
        isPatient: json.updatedPatient.isPatient,
      },
    });
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.topContainer}>
        <img src="/profile.jpg" />
      </div>
      <div className={classes.bottomContainer}>
        <h1 onClick={() => navigate(`/doctor/${_id}`)}>{username}</h1>
        <p>{email}</p>
        <p>Specialization: {specialization}</p>
        {doctorIdExists ? (
          <button onClick={onUnsubscribeHandler}>Unsubscribe</button>
        ) : (
          <button onClick={onSubscribeHandler}>Subscribe</button>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
