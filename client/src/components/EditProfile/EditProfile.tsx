import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./EditProfile.module.css";
import { SettingInput } from "../SettingInput";
import { Button } from "../Button";
import { useTypedSelector } from "../../redux/hooks";
import { User } from "../../redux/auth/types";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../redux/user/actions";

interface IFormInputs {
  full_name: string;
  username: string;
  website: string;
  bio: string;
  email: string;
}

const schema = yup.object().shape({
  full_name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  website: yup.string().url("Website URL is invalid"),
  bio: yup.string(),
});

export const EditProfile = () => {
  const dispatch = useDispatch();

  const sessionId = useTypedSelector((state) => state.auth.session);
  const usersById = useTypedSelector((state) => state.entities.users.byId);

  const user = usersById[sessionId as number];

  useEffect(() => {
    setUserValues(user);
  }, []);

  const { register, handleSubmit, errors, formState, setValue } = useForm<
    IFormInputs
  >({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const setUserValues = (user: User): void => {
    const inputNames: (keyof User)[] = [
      "full_name",
      "username",
      "website",
      "bio",
      "email",
    ];

    for (const name of inputNames) {
      setValue(name, user[name]);
    }

    return;
  };

  const onSubmit = (data: IFormInputs) => {
    dispatch(updateUserAction<IFormInputs>(data, user.id));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <SettingInput
          label="Name"
          name="full_name"
          error={errors.full_name?.message}
          ref={register}
        />
        <SettingInput
          label="Username"
          name="username"
          error={errors.username?.message}
          ref={register}
        />
        <SettingInput
          label="Website"
          name="website"
          error={formState.touched.website ? errors.website?.message : ""}
          ref={register}
        />
        <SettingInput
          label="Bio"
          name="bio"
          error={errors.bio?.message}
          ref={register}
        />
        <SettingInput
          label="Email"
          name="email"
          error={errors.email?.message}
          ref={register}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Save
        </Button>
      </form>
    </div>
  );
};
