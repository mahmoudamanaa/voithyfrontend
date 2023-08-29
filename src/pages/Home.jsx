import DoctorView from "../components/views/DoctorView";
import PatientView from "../components/views/PatientView";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <div>
      {user.isDoctor ? <DoctorView /> : null}
      {user.isPatient ? <PatientView /> : null}
    </div>
  );
};

export default Home;
