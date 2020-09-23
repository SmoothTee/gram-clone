import React from "react";
import { Link } from "react-router-dom";

import styles from "./UserLink.module.css";

interface UserLinkProps {
  username: string;
}

export const UserLink = ({ username }: UserLinkProps) => {
  return (
    <div className={styles.user}>
      <Link to={`/profile/${username}`}>
        <img
          className={styles.avatar}
          src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
          alt="avatar"
        />
      </Link>
      <Link to={`/profile/${username}`} className={styles.username}>
        {username}
      </Link>
    </div>
  );
};
