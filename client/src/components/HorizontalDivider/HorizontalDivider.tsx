import React from "react";

import styles from "./HorizontalDivider.module.css";

interface HorizontalDividerProps {
  text: string;
}

export const HorizontalDivider = ({ text }: HorizontalDividerProps) => {
  return (
    <div className={styles.container}>
      <hr className={styles.line} />
      <span className={styles.text}>{text}</span>
      <hr className={styles.line} />
    </div>
  );
};
