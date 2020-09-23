import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import styles from "./Comment.module.css";
import { useTypedSelector } from "../../redux/hooks";
import { CommentLikeIcon } from "../CommentLikeIcon";

interface CommentProps {
  commentId: number;
}

export const Comment = ({ commentId }: CommentProps) => {
  const { comments, users } = useTypedSelector((state) => state.entities);

  const comment = comments.byId[commentId];
  const user = users.byId[comment.user_id];

  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src={
          user.avatar_url
            ? user.avatar_url
            : "https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
        }
        alt="avatar"
      />
      <div className={styles.main}>
        <Link className={styles.username} to={`/profile/${user.username}`}>
          {user.username}
        </Link>
        <span className={styles.text}>{comment.text}</span>
      </div>
      <CommentLikeIcon commentId={commentId} liked={comment.liked} />
      <div className={styles.footer}>
        <span className={styles.created_at}>
          {moment(comment.created_at).fromNow()}
        </span>
        <button className={styles.footer_button}>
          {comment.likes ? comment.likes : 0} like
          {comment.likes === 1 ? "" : "s"}
        </button>
        <button className={styles.footer_button}>Reply</button>
      </div>
    </div>
  );
};
