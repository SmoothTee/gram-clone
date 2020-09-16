import React from "react";
import { AiOutlineGithub } from "react-icons/ai";

import styles from "./GithubLogin.module.css";

export const GithubLogin = () => {
  return (
    <button className={styles.button}>
      <AiOutlineGithub className={styles.icon} />
      <span className={styles.text}>Log In with Github</span>
    </button>
  );
};
