import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { MdChatBubbleOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./PostIcons.module.css";
import {
  unlikePostAction,
  likePostAction,
  unsavePostAction,
  savePostAction,
} from "../../redux/post/actions";

interface PostIconsProps {
  postId: number;
  liked?: number;
  saved?: boolean;
}

export const PostIcons = ({ postId, liked, saved }: PostIconsProps) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <button
        className={styles.icon_button}
        onClick={() => {
          if (liked) {
            dispatch(unlikePostAction(postId));
          } else {
            dispatch(likePostAction(postId));
          }
        }}
      >
        {liked ? (
          <AiFillHeart className={styles.filled_heart} />
        ) : (
          <AiOutlineHeart />
        )}
      </button>
      <Link to={`/post/${postId}`} className={styles.icon_button}>
        <MdChatBubbleOutline />
      </Link>
      <button
        className={styles.icon_button}
        onClick={() => {
          if (saved) {
            dispatch(unsavePostAction(postId));
          } else {
            dispatch(savePostAction(postId));
          }
        }}
      >
        {saved ? <BsBookmarkFill /> : <BsBookmark />}
      </button>
    </div>
  );
};
