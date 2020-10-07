import React from "react";
import { RootModal } from "../RootModal";

import styles from "./FollowerModal.module.css";

interface FollowerModalProps {
  title: string;
  userIds: number[];
}

export const FollowerModal = ({ title, userIds }: FollowerModalProps) => {
  return (
    <RootModal blank={true}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
      </div>
      <ul className={styles.list}>
        {userIds.map((uId) => (
          <li key={uId}>
            <span>{uId}</span>
          </li>
        ))}
      </ul>
    </RootModal>
  );
};
