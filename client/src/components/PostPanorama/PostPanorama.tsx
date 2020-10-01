import moment from "moment";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useTypedSelector } from "../../redux/hooks";

import { Comment } from "../Comment";
import { CommentForm } from "../CommentForm";
import { MediaCarousel } from "../MediaCarousel";
import { PostIcons } from "../PostIcons";
import { PostLikes } from "../PostLikes";
import { UserLink } from "../UserLink";

import styles from "./PostPanorama.module.css";

interface PostPanoramaProps {
  postId: number;
}

export const PostPanorama = ({ postId }: PostPanoramaProps) => {
  const { posts, users } = useTypedSelector((state) => state.entities);
  const commentsByPostId = useTypedSelector((state) => state.commentsByPostId);
  const postMediaByPostId = useTypedSelector(
    (state) => state.postMedia.byPostId
  );

  const commentIds = commentsByPostId[postId]
    ? commentsByPostId[postId].items
    : [];
  const postMediaIds = postMediaByPostId[postId];
  const { user_id } = posts.byId[postId];
  const user = users.byId[user_id];
  const post = posts.byId[postId];

  return (
    <div className={styles.post}>
      <MediaCarousel mediaIds={postMediaIds} />
      <div className={styles.info}>
        <div className={styles.header}>
          <UserLink userId={user.id} />
          <button className={styles.follow_button}>Follow</button>
          <button className={styles.dot_button}>
            <BsThreeDots />
          </button>
        </div>
        <div className={styles.comments}>
          {commentIds.map((cId: number) => (
            <Comment key={cId} commentId={cId} />
          ))}
        </div>
        <div className={styles.details}>
          <PostIcons postId={postId} liked={post.liked} saved={post.saved} />
          <PostLikes likes={post.likes} />
          <span className={styles.created_at}>
            {moment(post.created_at).fromNow()}
          </span>
        </div>
        <CommentForm postId={postId} />
      </div>
    </div>
  );
};
