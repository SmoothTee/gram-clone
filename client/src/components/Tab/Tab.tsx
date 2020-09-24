import React, { ReactNode } from "react";

import styles from "./Tab.module.css";

interface TabProps {
  children: ReactNode;
}

export const Tab = ({ children }: TabProps) => {
  return <div className={styles.container}>{children}</div>;
};
