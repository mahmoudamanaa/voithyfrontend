import classes from "./Form.module.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "../../hooks/useLogin";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(9).required(),
});

const LoginForm = () => {
  const { dispatch } = useAuthContext();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("http://localhost:4000/auth/login/success");

      const data = await response.json();

      console.log(data);

      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));

        dispatch({ type: "LOGIN", payload: data });
      }
    };

    getUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { login, isLoading, error } = useLogin();

  const onLoginHandler = async (data) => {
    await login(data);
    reset();
  };

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit(onLoginHandler)}>
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
          Login
        </button>
        {error ? <p className={classes.formError}>{error}</p> : null}
      </form>
      <a
        className={classes.google}
        href="http://localhost:4000/auth/google?type=login"
      >
        Login with Google
      </a>
    </div>
  );
};

export default LoginForm;
