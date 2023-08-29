import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import PatientProfile from "./components/profiles/PatientProfile";
import DoctorProfile from "./components/profiles/DoctorProfile";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        {user ? <Navbar /> : null}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/patient/:patientId"
            element={user ? <PatientProfile /> : <Navigate to="/login" />}
          />
          <Route
            path="/doctor/:doctorId"
            element={user ? <DoctorProfile /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
