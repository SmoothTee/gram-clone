import React, { ReactNode } from "react";

import styles from "./PostMenu.module.css";

interface PostMenuProps {
  children: ReactNode;
}

export const PostMenu = ({ children }: PostMenuProps) => {
  return <ul className={styles.list}>{children}</ul>;
};
