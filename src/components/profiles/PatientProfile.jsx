import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from "./Profiles.module.css";
import NoteForm from "../forms/NoteForm";
import { useNotesContext } from "../../hooks/useNotesContext";
import NoteCard from "../cards/NoteCard";

const PatientProfile = () => {
  const { patientId } = useParams();

  const [patient, setPatient] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthContext();
  const { notes, dispatch } = useNotesContext();

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetch(
        `http://localhost:4000/api/users/notes/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      dispatch({ type: "SET_NOTES", payload: data.notes });
    };

    getNotes();
  }, [user.token]);

  useEffect(() => {
    const getPatient = async () => {
      const response = await fetch(
        `http://localhost:4000/api/users/patient/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const data = await response.json();

      setPatient(data.patient);
    };

    getPatient();
  }, [user.token]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.leftContainer}>
        <img src="/profile.jpg" />
        <h1>{patient.username}</h1>
        <p>{patient.email}</p>
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
        <div className={classes.noteFormContainer}>
          {user.isDoctor ? (
            <button onClick={() => setIsOpen(true)} type="button">
              Add New Note
            </button>
          ) : null}
          {isOpen ? (
            <NoteForm setIsOpen={setIsOpen} patientId={patientId} />
          ) : null}
        </div>
        <div className={classes.notesContainer}>
          {notes?.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
