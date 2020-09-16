import React from "react";

import styles from "./Header.module.css";
import { Logo } from "../Logo";
import { NavBar } from "../NavBar";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <NavBar />
    </header>
  );
};
