import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./ChangePassword.module.css";
import { Button } from "../Button";
import { SettingInput } from "../SettingInput";
import { useDispatch } from "react-redux";
import { changePasswordAction } from "../../redux/user/actions";

interface IFormInputs {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

const schema = yup.object().shape({
  old_password: yup.string().required("Old password is required"),
  new_password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must have at least 6 characters"),
  confirm_new_password: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("new_password")], "Passwords must match"),
});

export const ChangePassword = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: IFormInputs) => {
    dispatch(changePasswordAction<IFormInputs>(data));
  };

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <SettingInput
          label="Old Password"
          name="old_password"
          type="password"
          error={
            formState.touched.old_password ? errors.old_password?.message : ""
          }
          ref={register}
        />
        <SettingInput
          label="New Password"
          name="new_password"
          type="password"
          error={
            formState.touched.new_password ? errors.new_password?.message : ""
          }
          ref={register}
        />
        <SettingInput
          label="Confirm New Password"
          name="confirm_new_password"
          type="password"
          error={
            formState.touched.confirm_new_password
              ? errors.confirm_new_password?.message
              : ""
          }
          ref={register}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Change Password
        </Button>
      </form>
    </div>
  );
};
