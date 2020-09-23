import React from "react";

import styles from "./PostLikes.module.css";

interface PostLikesProps {
  likes: number;
}

export const PostLikes = ({ likes }: PostLikesProps) => {
  return (
    <button className={styles.likes}>
      {likes} like{likes === 1 ? "" : "s"}
    </button>
  );
};
