import classes from "./Cards.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotesContext } from "../../hooks/useNotesContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  title: yup.string().min(1).required(),
  description: yup.string().min(1).required(),
});

const NoteCard = ({ note }) => {
  const { title, description, doctorId, _id, patientId } = note;

  const { user } = useAuthContext();

  const [doctorName, setDoctorName] = useState("");

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

      const json = await response.json();

      setDoctorName(json.doctor?.username);
    };

    getDoctor();
  }, [user.token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: title, description: description },
  });

  const [isOpen, setIsOpen] = useState(false);

  const { dispatch } = useNotesContext();

  const onDeleteHandler = async () => {
    const response = await fetch(
      `http://localhost:4000/api/users/note/delete/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    dispatch({ type: "DELETE_NOTE", payload: { _id } });
  };

  const onEditHandler = async (data) => {
    const response = await fetch(
      `http://localhost:4000/api/users/note/edit/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
        }),
      }
    );

    const json = await response.json();

    dispatch({ type: "DELETE_NOTE", payload: { _id } });
    dispatch({ type: "CREATE_NOTE", payload: json.note });

    reset();
    setIsOpen(false);
  };

  return (
    <div className={classes.cardContainer}>
      <div className={classes.titleContainer}>
        <h1>{title}</h1>
      </div>
      <div className={classes.actionsContainer}>
        <p>{description}</p>
        <p>Doctor: {doctorName}</p>
        {user.isDoctor ? (
          <div className={classes.actions}>
            <button onClick={() => setIsOpen(true)}>Edit</button>
            <button onClick={onDeleteHandler}>Delete</button>
          </div>
        ) : null}
        {isOpen ? (
          <div className={classes.formContainer}>
            <form
              className={classes.form}
              onSubmit={handleSubmit(onEditHandler)}
            >
              <input
                {...register("title")}
                type="text"
                placeholder="title"
                required
              />
              {errors.title ? (
                <p className={classes.formError}>{errors.title?.message}</p>
              ) : null}
              <textarea
                {...register("description")}
                type="text"
                placeholder="description"
                required
                rows={5}
              ></textarea>
              {errors.description ? (
                <p className={classes.formError}>
                  {errors.description?.message}
                </p>
              ) : null}
              <button type="submit">Edit Note</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NoteCard;
