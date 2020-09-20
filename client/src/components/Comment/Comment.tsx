import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../redux/hooks";

import styles from "./Comment.module.css";

interface CommentProps {
  commentId: number;
}

export const Comment = ({ commentId }: CommentProps) => {
  const { users, comments } = useTypedSelector((state) => state.entities);

  const comment = comments.byId[commentId];
  const user = users.byId[comment.user_id];

  return (
    <div className={styles.container}>
      <Link className={styles.user} to={`/profile/${user.username}`}>
        {user.username}
      </Link>
      <span className={styles.text}>{comment.text}</span>
      <button className={styles.like_button}>
        <AiOutlineHeart />
      </button>
    </div>
  );
};
