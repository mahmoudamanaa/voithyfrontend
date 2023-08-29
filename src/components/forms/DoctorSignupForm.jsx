import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDoctorSignup } from "../../hooks/useSignup";

import classes from "./Form.module.css";

const doctorSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(9).required(),
  username: yup.string().min(1).required(),
  specialization: yup.string().min(1).required(),
});

const DoctorSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(doctorSchema) });

  const { signup, isLoading, error } = useDoctorSignup();

  const onDoctorSubmitHandler = async (data) => {
    await signup(data);
    reset();
  };

  return (
    <div className={classes.formContainer}>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onDoctorSubmitHandler)}
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
        <input
          {...register("specialization")}
          type="text"
          placeholder="specialization"
          required
        />
        {errors.specialization ? (
          <p className={classes.formError}>{errors.specialization?.message}</p>
        ) : null}
        <button type="submit" disabled={isLoading}>
          Signup
        </button>
        {error ? <p className={classes.formError}>{error}</p> : null}
      </form>
      <a
        className={classes.google}
        href="http://localhost:4000/auth/google?type=doctor&spec=spec"
      >
        Signup with Google
      </a>
    </div>
  );
};

export default DoctorSignupForm;
