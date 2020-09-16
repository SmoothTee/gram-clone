import React from "react";

import styles from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}>
        <div className={`${styles.cube} ${styles.cube1}`}></div>
        <div className={`${styles.cube} ${styles.cube2}`}></div>
        <div className={`${styles.cube} ${styles.cube4}`}></div>
        <div className={`${styles.cube} ${styles.cube3}`}></div>
      </div>
    </div>
  );
};
