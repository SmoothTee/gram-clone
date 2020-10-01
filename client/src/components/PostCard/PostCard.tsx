import React from "react";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./PostCard.module.css";
import { useTypedSelector } from "../../redux/hooks";
import { CommentPreview } from "../CommentPreview";
import { MediaCarousel } from "../MediaCarousel";
import { UserLink } from "../UserLink";
import { CommentForm } from "../CommentForm";
import { PostIcons } from "../PostIcons";
import { PostLikes } from "../PostLikes";
import { hideModal, showModal } from "../../redux/modal/actions";
import { PostMenu } from "../PostMenu";
import { PostMenuItem } from "../PostMenu/components/PostMenuItem";

interface PostCardProps {
  postId: number;
}

export const PostCard = ({ postId }: PostCardProps) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { users, posts } = useTypedSelector((state) => state.entities);
  const mediaByPostId = useTypedSelector((state) => state.postMedia.byPostId);
  const commentsByPostId = useTypedSelector((state) => state.commentsByPostId);

  const post = posts.byId[postId];
  const user = users.byId[post.user_id];
  const mediaIds = mediaByPostId[postId];
  const commentIds = commentsByPostId[postId]
    ? commentsByPostId[postId].items
    : [];

  const openPostMenu = () => {
    const children = (
      <PostMenu>
        <PostMenuItem
          label="Unfollow"
          onClick={() => console.log("Unfollowed!")}
        />
        <PostMenuItem
          label="Go to post"
          onClick={() => {
            history.push(`/post/${postId}`);
            dispatch(hideModal());
          }}
        />
        <PostMenuItem
          label="Copy link"
          onClick={() => {
            navigator.clipboard.writeText(
              `http://localhost:3000/post/${postId}`
            );
            dispatch(hideModal());
          }}
        />
        <PostMenuItem label="Cancel" onClick={() => dispatch(hideModal())} />
      </PostMenu>
    );
    dispatch(showModal("PostMenuModal", { children }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <UserLink userId={user.id} />
        <button className={styles.dot_button} onClick={openPostMenu}>
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
        <button
          className={styles.view_comments_button}
          onClick={() => dispatch(showModal("PostModal", { postId }))}
        >
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
