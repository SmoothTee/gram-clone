import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/Button";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/auth/actions";
import { useTypedSelector } from "../../redux/hooks";

interface IFormInputs {
  email: string;
  full_name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  full_name: yup.string().required("Full Name is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const Register = () => {
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
    dispatch(registerAction<IFormInputs>(data));
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
            label="Email"
            name="email"
            error={
              formState.touched.email && errors.email?.message
                ? errors.email?.message
                : ""
            }
            ref={register}
          />
          <Input
            label="Full Name"
            name="full_name"
            error={
              formState.touched.full_name && errors.full_name?.message
                ? errors.full_name?.message
                : ""
            }
            ref={register}
          />
          <Input
            label="Username"
            name="username"
            error={
              formState.touched.username && errors.username?.message
                ? errors.username?.message
                : ""
            }
            ref={register}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            error={
              formState.touched.password && errors.password?.message
                ? errors.password?.message
                : ""
            }
            ref={register}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            error={
              formState.touched.confirmPassword &&
              errors.confirmPassword?.message
                ? errors.confirmPassword?.message
                : ""
            }
            ref={register}
          />
          <Button
            type="submit"
            loading={isFetching}
            disabled={!formState.isValid}
          >
            Register
          </Button>
        </form>
        <span className={styles.login}>
          Have an Account?{" "}
          <Link className={styles.link} to="/">
            Log In
          </Link>
        </span>
      </div>
    </div>
  );
};
