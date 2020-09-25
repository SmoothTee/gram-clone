import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./ChangePassword.module.css";
import { Button } from "../Button";
import { SettingInput } from "../SettingInput";

interface IFormInputs {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

const schema = yup.object().shape({
  old_password: yup.string().required(),
  new_password: yup.string().required(),
  confirm_new_password: yup.string().required(),
});

export const ChangePassword = () => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: IFormInputs) => console.log("Data", data);

  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <SettingInput label="Old Password" name="old_password" ref={register} />
        <SettingInput label="New Password" name="new_password" ref={register} />
        <SettingInput
          label="Confirm New Password"
          name="confirm_new_password"
          ref={register}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Change Password
        </Button>
      </form>
    </div>
  );
};
