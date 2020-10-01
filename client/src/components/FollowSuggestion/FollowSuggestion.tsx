import React from "react";
import { useTypedSelector } from "../../redux/hooks";

import styles from "./FollowSuggestion.module.css";

interface FollowSuggestionProps {
  userId: number;
}

export const FollowSuggestion = ({ userId }: FollowSuggestionProps) => {
  const users = useTypedSelector((state) => state.entities.users);

  const user = users.byId[userId];

  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={user.avatar_url} alt="avatar" />
      <span className={styles.username}>{user.username}</span>
      <span className={styles.full_name}>{user.full_name}</span>
      <button className={styles.follow_button}>Follow</button>
    </div>
  );
};
