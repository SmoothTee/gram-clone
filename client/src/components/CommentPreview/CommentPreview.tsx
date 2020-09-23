import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./CommentPreview.module.css";
import {
  likeCommentAction,
  unlikeCommentAction,
} from "../../redux/comment/actions";
import { useTypedSelector } from "../../redux/hooks";
import { CommentLikeIcon } from "../CommentLikeIcon";

interface CommentPreviewProps {
  commentId: number;
}

export const CommentPreview = ({ commentId }: CommentPreviewProps) => {
  const { users, comments } = useTypedSelector((state) => state.entities);

  const comment = comments.byId[commentId];
  const user = users.byId[comment.user_id];

  return (
    <div className={styles.container}>
      <Link className={styles.user} to={`/profile/${user.username}`}>
        {user.username}
      </Link>
      <span className={styles.text}>{comment.text}</span>
      <CommentLikeIcon commentId={commentId} liked={comment.liked} />
    </div>
  );
};
