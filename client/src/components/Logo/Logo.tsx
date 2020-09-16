import React from "react";
import { AiFillBug } from "react-icons/ai";

import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <div className={styles.container}>
      <AiFillBug className={styles.icon} />
      <span className={styles.text}>Gram</span>
    </div>
  );
};
