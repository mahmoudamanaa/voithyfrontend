import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePatientSignup } from "../../hooks/useSignup";

import classes from "./Form.module.css";

const patientSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(9).required(),
  username: yup.string().min(1).required(),
});

const PatientSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(patientSchema) });

  const { signup, isLoading, error } = usePatientSignup();

  const onPatientSubmitHandler = async (data) => {
    await signup(data);
    reset();
  };

  return (
    <div className={classes.formContainer}>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onPatientSubmitHandler)}
      >
        <input
          {...register("username")}
          type="text"
          placeholder="username"
          required
        />
        {errors.username ? (
          <p className={classes.formError}>{errors.username?.message}</p>
        ) : null}
        <input
          {...register("email")}
          type="email"
          placeholder="email"
          required
        />
        {errors.email ? (
          <p className={classes.formError}>{errors.email?.message}</p>
        ) : null}
        <input
          {...register("password")}
          type="password"
          placeholder="password"
          required
        />
        {errors.password ? (
          <p className={classes.formError}>{errors.password?.message}</p>
        ) : null}
        <button type="submit" disabled={isLoading}>
          Signup
        </button>
        {error ? <p className={classes.formError}>{error}</p> : null}
      </form>
      <a
        className={classes.google}
        href="http://localhost:4000/auth/google?type=patient"
      >
        Signup with Google
      </a>
    </div>
  );
};

export default PatientSignupForm;
