import React, { ReactNode } from "react";

import styles from "./CenterBox.module.css";

interface CenterBoxProps {
  children: ReactNode;
}

export const CenterBox = ({ children }: CenterBoxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};
