import React, { FormEvent, useState } from "react";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

import styles from "./PostCard.module.css";
import { useTypedSelector } from "../../redux/hooks";
import { CommentPreview } from "../CommentPreview";
import { MediaCarousel } from "../MediaCarousel";
import { UserLink } from "../UserLink";
import { CommentForm } from "../CommentForm";
import { PostIcons } from "../PostIcons";
import { PostLikes } from "../PostLikes";

interface PostCardProps {
  postId: number;
}

export const PostCard = ({ postId }: PostCardProps) => {
  const { users, posts } = useTypedSelector((state) => state.entities);
  const mediaByPostId = useTypedSelector((state) => state.postMedia.byPostId);
  const commentsByPostId = useTypedSelector((state) => state.commentsByPostId);

  const post = posts.byId[postId];
  const user = users.byId[post.user_id];
  const mediaIds = mediaByPostId[postId];
  const commentIds = commentsByPostId[postId]
    ? commentsByPostId[postId].items
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <UserLink username={user.username} />
        <button className={styles.dot_button}>
          <BsThreeDots />
        </button>
      </div>
      <MediaCarousel mediaIds={mediaIds} />
      <div className={styles.main}>
        <PostIcons postId={postId} liked={post.liked} saved={post.saved} />
        <PostLikes likes={post.likes} />
        <div className={styles.caption_container}>
          <Link className={styles.username} to={`/profile/${user.username}`}>
            {user.username}
          </Link>
          <span className={styles.caption}>{post.caption}</span>
        </div>
        <button className={styles.view_comments_button}>
          <span className={styles.view_comments}>
            View all {post.num_of_comments} comment
            {post.num_of_comments === 1 ? "" : "s"}
          </span>
        </button>
        {commentIds.slice(0, 3).map((cId) => (
          <CommentPreview key={cId} commentId={cId} />
        ))}
        <span className={styles.created_at}>
          {moment(post.created_at).fromNow()}
        </span>
      </div>
      <CommentForm postId={postId} />
    </div>
  );
};
