import classes from "./Profiles.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const DoctorProfile = () => {
  const { doctorId } = useParams();

  const [doctor, setDoctor] = useState({});

  const { user } = useAuthContext();

  useEffect(() => {
    const getDoctor = async () => {
      const response = await fetch(
        `http://localhost:4000/api/users/doctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      setDoctor(data.doctor);
    };

    getDoctor();
  }, [user.token]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.leftContainer}>
        <img src="/profile.jpg" />
        <h1>{doctor.username}</h1>
        <p>{doctor.email}</p>
        <p>Specialization: {doctor.specialization}</p>
      </div>
      <div className={classes.rightContainer}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
          veritatis iure tenetur impedit aliquam voluptatem adipisci quos animi,
          facere fuga, libero at eligendi similique, molestiae quibusdam numquam
          atque deleniti et!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
          veritatis iure tenetur impedit aliquam voluptatem adipisci quos animi,
          facere fuga, libero at eligendi similique, molestiae quibusdam numquam
          atque deleniti et!
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;
