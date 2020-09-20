import React, { FormEvent, useState } from "react";
import Carousel from "nuka-carousel";
import moment from "moment";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import styles from "./PostCard.module.css";
import { MdChatBubbleOutline } from "react-icons/md";
import { useTypedSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { likePostAction, unlikePostAction } from "../../redux/post/actions";
import { createCommentAction } from "../../redux/comment/actions";
import { Comment } from "../Comment";

interface PostCardProps {
  postId: number;
}

export const PostCard = ({ postId }: PostCardProps) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const { users, posts, postMedia } = useTypedSelector(
    (state) => state.entities
  );
  const mediaByPostId = useTypedSelector((state) => state.postMedia.byPostId);
  const commentsByPostId = useTypedSelector((state) => state.commentsByPostId);

  const post = posts.byId[postId];
  const user = users.byId[post.user_id];
  const mediaIds = mediaByPostId[postId];
  const commentIds = commentsByPostId[postId]
    ? commentsByPostId[postId].items
    : [];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(createCommentAction(postId, comment));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img
            className={styles.avatar}
            src="https://avatars.dicebear.com/api/male/john.svg?mood[]=happy"
            alt="avatar"
          />
          <Link to={`/profiles/${user.username}`} className={styles.username}>
            {user.username}
          </Link>
        </div>
        <button className={styles.dot_button}>
          <BsThreeDots />
        </button>
      </div>
      <Carousel>
        {mediaIds.map((mId) => {
          const media = postMedia.byId[mId];
          return (
            <img className={styles.image} key={mId} src={media.media_url} />
          );
        })}
      </Carousel>
      <div className={styles.main}>
        <div className={styles.icons}>
          <button
            className={styles.icon_button}
            onClick={() => {
              if (post.liked) {
                dispatch(unlikePostAction(postId));
              } else {
                dispatch(likePostAction(postId));
              }
            }}
          >
            {post.liked ? (
              <AiFillHeart className={styles.filled_heart} />
            ) : (
              <AiOutlineHeart />
            )}
          </button>
          <button className={styles.icon_button}>
            <MdChatBubbleOutline />
          </button>
          <button className={styles.icon_button}>
            <BsBookmark />
          </button>
        </div>
        <span className={styles.likes}>
          {post.likes} like{post.likes === 1 ? "" : "s"}
        </span>
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
        {commentIds.map((cId) => (
          <Comment key={cId} commentId={cId} />
        ))}
        <span className={styles.created_at}>
          {moment(post.created_at).fromNow()}
        </span>
      </div>
      <form className={styles.comment_form} onSubmit={handleSubmit}>
        <textarea
          className={styles.comment}
          placeholder="Add a comment..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit" className={styles.comment_button}>
          Post
        </button>
      </form>
    </div>
  );
};
