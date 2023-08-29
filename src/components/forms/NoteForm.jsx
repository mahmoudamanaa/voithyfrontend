import classes from "./Form.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotesContext } from "../../hooks/useNotesContext";

const schema = yup.object().shape({
  title: yup.string().min(1).required(),
  description: yup.string().min(1).required(),
});

const NoteForm = ({ setIsOpen, patientId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { user } = useAuthContext();
  const { userId } = user;

  const { dispatch } = useNotesContext();

  const onSubmitHandler = async (data) => {
    const response = await fetch("http://localhost:4000/api/users/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        patientId: patientId,
        doctorId: userId,
      }),
    });

    const json = await response.json();

    dispatch({ type: "CREATE_NOTE", payload: json.note });

    reset();
    setIsOpen(false);
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitHandler)}>
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
          <p className={classes.formError}>{errors.description?.message}</p>
        ) : null}
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default NoteForm;
