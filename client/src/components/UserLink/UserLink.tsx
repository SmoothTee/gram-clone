import React from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../redux/hooks";

import styles from "./UserLink.module.css";

interface UserLinkProps {
  userId: number;
}

export const UserLink = ({ userId }: UserLinkProps) => {
  const users = useTypedSelector((state) => state.entities.users);
  const user = users.byId[userId];
  const { username, avatar_url } = user;

  const avatar = avatar_url
    ? avatar_url
    : "https://avatars.dicebear.com/api/male/john.svg?mood[]=happy";

  return (
    <div className={styles.user}>
      <Link to={`/profile/${username}`}>
        <img className={styles.avatar} src={avatar} alt="avatar" />
      </Link>
      <Link to={`/profile/${username}`} className={styles.username}>
        {username}
      </Link>
    </div>
  );
};
