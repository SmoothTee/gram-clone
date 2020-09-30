import React from "react";

import styles from "./PostMenuItem.module.css";

interface PostMenuItemProps {
  onClick: () => void;
  label: string;
}

export const PostMenuItem = ({ onClick, label }: PostMenuItemProps) => {
  return (
    <li className={styles.item}>
      <button className={styles.button} onClick={onClick}>
        {label}
      </button>
    </li>
  );
};
