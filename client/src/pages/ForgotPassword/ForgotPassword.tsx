import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./ForgotPassword.module.css";
import { Button } from "../../components/Button";
import { CenterBox } from "../../components/CenterBox";
import { Input } from "../../components/Input";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPasswordAction } from "../../redux/auth/actions";

interface IFormInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
});

export const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, formState, setError } = useForm<
    IFormInputs
  >({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: IFormInputs) => {
    dispatch(forgotPasswordAction(data.email));
  };

  return (
    <CenterBox>
      <h2>Forgot Password</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          name="email"
          ref={register}
          error={formState.touched.email ? errors.email?.message : ""}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Send Reset Link
        </Button>
      </form>
      <span className={styles.login}>
        Remember password?{" "}
        <Link className={styles.link} to="/">
          Log In
        </Link>
      </span>
    </CenterBox>
  );
};
