import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Comment.module.css";
import {
  likeCommentAction,
  unlikeCommentAction,
} from "../../redux/comment/actions";
import { useTypedSelector } from "../../redux/hooks";

interface CommentProps {
  commentId: number;
}

export const Comment = ({ commentId }: CommentProps) => {
  const dispatch = useDispatch();

  const { users, comments } = useTypedSelector((state) => state.entities);

  const comment = comments.byId[commentId];
  const user = users.byId[comment.user_id];

  return (
    <div className={styles.container}>
      <Link className={styles.user} to={`/profile/${user.username}`}>
        {user.username}
      </Link>
      <span className={styles.text}>{comment.text}</span>
      <button
        className={styles.like_button}
        onClick={() => {
          if (comment.liked) {
            dispatch(unlikeCommentAction(commentId));
          } else {
            dispatch(likeCommentAction(commentId));
          }
        }}
      >
        {comment.liked ? (
          <AiFillHeart className={styles.filled_heart} />
        ) : (
          <AiOutlineHeart />
        )}
      </button>
    </div>
  );
};
