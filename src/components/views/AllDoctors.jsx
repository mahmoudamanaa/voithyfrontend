import { useEffect, useState } from "react";
import DoctorCard from "../cards/DoctorCard";
import { useAuthContext } from "../../hooks/useAuthContext";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getDoctors = async () => {
      const response = await fetch("http://localhost:4000/api/users/doctors", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      setDoctors(data.doctors);
    };

    getDoctors();
  }, [user.token]);

  return (
    <>
      {!doctors || doctors.length === 0 ? <p>No Results Found.</p> : null}
      {doctors.map((doctor) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </>
  );
};

export default AllDoctors;
