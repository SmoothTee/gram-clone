import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { Link } from "react-router-dom";

import styles from "./Register.module.css";
import { Input } from "../../components/Input";
import { Logo } from "../../components/Logo";
import { Button } from "../../components/Button";

interface IFormInputs {
  email: string;
  full_name: string;
  username: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  full_name: yup.string().required("Full Name is required"),
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters"),
});

export const Register = () => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: IFormInputs) => console.log(data);

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
          <Button type="submit" disabled={!formState.isValid}>
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
