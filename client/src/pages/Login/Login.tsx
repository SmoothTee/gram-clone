import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./Login.module.css";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Logo } from "../../components/Logo";
import { HorizontalDivider } from "../../components/HorizontalDivider";
import { GithubLogin } from "../../components/GithubLogin";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/auth/actions";
import { useTypedSelector } from "../../redux/hooks";

interface IFormInputs {
  usernameOrEmail: string;
  password: string;
}

const schema = yup.object().shape({
  usernameOrEmail: yup.string().required("Username or Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters"),
});

export const Login = () => {
  const dispatch = useDispatch();

  const isFetching = useTypedSelector((state) => state.auth.isFetching);
  const error = useTypedSelector((state) => state.error);

  const { register, handleSubmit, errors, formState, setError } = useForm<
    IFormInputs
  >({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: IFormInputs) => {
    dispatch(loginAction(data));
  };

  useEffect(() => {
    if (error && error.data) {
      Object.entries(error.data).forEach((err) =>
        setError(err[0] as keyof IFormInputs, {
          type: "manual",
          message: err[1] as string,
        })
      );
    }
  }, [error, setError]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Logo />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username or Email"
            name="usernameOrEmail"
            error={
              (formState.touched.usernameOrEmail || formState.isSubmitted) &&
              errors.usernameOrEmail?.message
                ? errors.usernameOrEmail?.message
                : ""
            }
            ref={register}
          />
          <Input
            label="Password"
            name="password"
            error={
              (formState.touched.password || formState.isSubmitted) &&
              errors.password?.message
                ? errors.password?.message
                : ""
            }
            type="password"
            ref={register}
          />
          <Button
            type="submit"
            loading={isFetching}
            disabled={!formState.isValid}
          >
            Log In
          </Button>
        </form>
        <HorizontalDivider text="Or" />
        <GithubLogin />
        <Link className={styles.link} to="/forgot-password">
          Forgot Password?
        </Link>
        <span className={styles.register}>
          Need an Account?{" "}
          <Link className={styles.link} to="/register">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};
