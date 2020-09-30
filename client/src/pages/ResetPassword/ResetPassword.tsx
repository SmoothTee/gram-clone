import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ResetPassword.module.css";
import { Button } from "../../components/Button";
import { CenterBox } from "../../components/CenterBox";
import { Input } from "../../components/Input";
import { loginAction, resetPasswordAction } from "../../redux/auth/actions";
import { useTypedSelector } from "../../redux/hooks";

interface IFormInputs {
  new_password: string;
  confirm_new_password: string;
}

const schema = yup.object().shape({
  new_password: yup
    .string()
    .min(6, "Password must have at least 6 characters")
    .required("New password is required"),
  confirm_new_password: yup
    .string()
    .required("Confirm new password is required")
    .oneOf([yup.ref("new_password")], "Passwords must match"),
});

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();

  const isFetching = useTypedSelector((state) => state.auth.isFetching);
  const error = useTypedSelector((state) => state.error);

  const { register, handleSubmit, errors, formState, setError } = useForm<
    IFormInputs
  >({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: IFormInputs) => {
    dispatch(
      resetPasswordAction(data.new_password, data.confirm_new_password, token)
    );
  };

  return (
    <CenterBox>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="New Password"
          name="new_password"
          error={
            formState.touched.new_password ? errors.new_password?.message : ""
          }
          type="password"
          ref={register}
        />
        <Input
          label="Confirm New Password"
          name="confirm_new_password"
          error={
            formState.touched.confirm_new_password
              ? errors.confirm_new_password?.message
              : ""
          }
          type="password"
          ref={register}
        />
        <Button type="submit" disabled={!formState.isValid || !token}>
          Reset Password
        </Button>
      </form>
    </CenterBox>
  );
};
