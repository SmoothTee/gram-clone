import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { MdChatBubble } from "react-icons/md";
import { useTypedSelector } from "../../redux/hooks";

import styles from "./PostQuadrat.module.css";

interface PostQuadratProps {
  postId: number;
}

export const PostQuadrat = ({ postId }: PostQuadratProps) => {
  const { posts, postMedia } = useTypedSelector((state) => state.entities);
  const postMediaByPostId = useTypedSelector(
    (state) => state.postMedia.byPostId
  );

  const post = posts.byId[postId];
  const mediaIds = postMediaByPostId[postId];
  const media = postMedia.byId[mediaIds[0]];

  return (
    <div className={styles.container}>
      <img className={styles.image} src={media.media_url} alt="post preview" />
      <div className={styles.overlay}>
        <span className={styles.likes}>
          <AiFillHeart /> {post.likes}
        </span>
        <span className={styles.comments}>
          <MdChatBubble /> {post.num_of_comments}
        </span>
      </div>
    </div>
  );
};
