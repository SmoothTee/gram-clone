import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import { Logo } from "../Logo";
import { NavBar } from "../NavBar";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo_link} to="/">
        <Logo />
      </Link>
      <NavBar />
    </header>
  );
};
