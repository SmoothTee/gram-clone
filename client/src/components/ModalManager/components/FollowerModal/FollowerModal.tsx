import React, { useEffect } from "react";
import { FollowSuggestion } from "../../../FollowSuggestion";
import { RootModal } from "../RootModal";

import styles from "./FollowerModal.module.css";

interface FollowerModalProps {
  title: string;
  placeholder: string;
  userIds: number[];
  cb: () => void;
}

export const FollowerModal = ({
  title,
  placeholder,
  userIds,
  cb,
}: FollowerModalProps) => {
  useEffect(() => {
    cb();
  }, []);

  return (
    <RootModal blank={true}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
      </div>
      <ul className={styles.list}>
        {userIds.length ? (
          userIds.map((uId) => <FollowSuggestion key={uId} userId={uId} />)
        ) : (
          <span className={styles.placeholder}>{placeholder}</span>
        )}
      </ul>
    </RootModal>
  );
};
