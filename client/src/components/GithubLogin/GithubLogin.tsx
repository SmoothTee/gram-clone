import React from "react";
import { AiOutlineGithub } from "react-icons/ai";

import styles from "./GithubLogin.module.css";

export const GithubLogin = () => {
  const requestUsersGithubIdentity = () => {
    const clientId = "dffe5b4ecd6584517e57";
    const redirectURI = "http://localhost:3000/github-login";
    const url = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectURI}`;

    window.location.href = url;
  };

  return (
    <button className={styles.button} onClick={requestUsersGithubIdentity}>
      <AiOutlineGithub className={styles.icon} />
      <span className={styles.text}>Log In with Github</span>
    </button>
  );
};
