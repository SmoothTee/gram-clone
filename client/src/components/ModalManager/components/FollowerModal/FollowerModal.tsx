import React, { useEffect } from "react";

import styles from "./FollowerModal.module.css";
import { useTypedSelector } from "../../../../redux/hooks";
import { FollowSuggestion } from "../../../FollowSuggestion";
import { RootModal } from "../RootModal";

interface FollowerModalProps {
  userId: number;
  title: string;
  placeholder: string;
  cb: () => void;
}

export const FollowerModal = ({
  userId,
  title,
  placeholder,
  cb,
}: FollowerModalProps) => {
  const follower = useTypedSelector((state) => state.follower);

  const followers = follower.byUserId[userId]
    ? follower.byUserId[userId].items.map((f) => f.follower_id)
    : [];
  const followings = follower.byFollowerId[userId]
    ? follower.byFollowerId[userId].items.map((f) => f.user_id)
    : [];

  useEffect(() => {
    cb();
  }, []);

  let userIds;
  if (title === "Followers") {
    userIds = followers;
  } else {
    userIds = followings;
  }

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
