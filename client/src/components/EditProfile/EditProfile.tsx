import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./EditProfile.module.css";
import { SettingInput } from "../SettingInput";
import { Button } from "../Button";

interface IFormInputs {
  name: string;
  username: string;
  website: string;
  bio: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  website: yup.string().url(),
  bio: yup.string(),
});

export const EditProfile = () => {
  const { register, handleSubmit, errors, formState } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data: IFormInputs) => console.log("Data", data);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <SettingInput label="Name" name="name" ref={register} />
        <SettingInput label="Username" name="username" ref={register} />
        <SettingInput label="Website" name="website" ref={register} />
        <SettingInput label="Bio" name="bio" ref={register} />
        <SettingInput label="Email" name="email" ref={register} />
        <Button type="submit" disabled={!formState.isValid}>
          Save
        </Button>
      </form>
    </div>
  );
};
