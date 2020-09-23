import React from "react";
import { useDispatch } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import styles from "./CommentLikeIcon.module.css";
import {
  likeCommentAction,
  unlikeCommentAction,
} from "../../redux/comment/actions";

interface CommentLikeIconProps {
  commentId: number;
  liked: boolean;
}

export const CommentLikeIcon = ({ commentId, liked }: CommentLikeIconProps) => {
  const dispatch = useDispatch();

  return (
    <button
      className={styles.like_button}
      onClick={() => {
        if (liked) {
          dispatch(unlikeCommentAction(commentId));
        } else {
          dispatch(likeCommentAction(commentId));
        }
      }}
    >
      {liked ? (
        <AiFillHeart className={styles.filled_heart} />
      ) : (
        <AiOutlineHeart />
      )}
    </button>
  );
};
