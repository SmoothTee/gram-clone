import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import styles from "./TabItem.module.css";

interface TabItemProps {
  path: string;
  children: ReactNode;
}

export const TabItem = ({ path, children }: TabItemProps) => {
  return (
    <NavLink
      exact
      className={styles.tab_item}
      activeClassName={styles.active}
      to={path}
    >
      {children}
    </NavLink>
  );
};
