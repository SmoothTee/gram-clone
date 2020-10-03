import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { MdChatBubble } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/hooks";
import { showModal } from "../../redux/modal/actions";

import styles from "./PostQuadrat.module.css";

interface PostQuadratProps {
  postId: number;
}

export const PostQuadrat = ({ postId }: PostQuadratProps) => {
  const dispatch = useDispatch();

  const { posts, postMedia } = useTypedSelector((state) => state.entities);
  const postMediaByPostId = useTypedSelector(
    (state) => state.postMedia.byPostId
  );

  const post = posts.byId[postId];
  const mediaIds = postMediaByPostId[postId];
  const media = postMedia.byId[mediaIds[0]];

  return (
    <div
      className={styles.container}
      onClick={() => dispatch(showModal("PostModal", { postId }))}
    >
      <img className={styles.image} src={media.media_url} alt="post preview" />
      <div className={styles.overlay}>
        <span className={styles.text}>
          <AiFillHeart className={styles.icon} /> {post.likes}
        </span>
        <span className={styles.text}>
          <MdChatBubble className={styles.icon} /> {post.num_of_comments}
        </span>
      </div>
    </div>
  );
};
