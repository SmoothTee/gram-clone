import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./Post.module.css";
import { Layout } from "../../components/Layout";
import { readPostAction } from "../../redux/post/actions";
import { MediaCarousel } from "../../components/MediaCarousel";
import { useTypedSelector } from "../../redux/hooks";
import { Comment } from "../../components/Comment";
import { BsThreeDots } from "react-icons/bs";
import { UserLink } from "../../components/UserLink";
import { CommentForm } from "../../components/CommentForm";
import { PostIcons } from "../../components/PostIcons";
import { PostLikes } from "../../components/PostLikes";

export const Post = () => {
  const dispatch = useDispatch();

  const { post_id } = useParams<{ post_id: string }>();

  const { isFetching, item } = useTypedSelector((state) => state.post);
  const { posts, users } = useTypedSelector((state) => state.entities);
  const commentsByPostId = useTypedSelector((state) => state.commentsByPostId);
  const postMediaByPostId = useTypedSelector(
    (state) => state.postMedia.byPostId
  );

  const numberPostId = Number(post_id);

  useEffect(() => {
    dispatch(readPostAction(numberPostId));
  }, []);

  if (isFetching || !item) {
    return <span>Loading</span>;
  } else {
    const commentIds = commentsByPostId[numberPostId]
      ? commentsByPostId[numberPostId].items
      : [];
    const postMediaIds = postMediaByPostId[numberPostId];
    const { user_id } = posts.byId[numberPostId];
    const user = users.byId[user_id];
    const post = posts.byId[numberPostId];

    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.post}>
            <MediaCarousel mediaIds={postMediaIds} />
            <div className={styles.info}>
              <div className={styles.header}>
                <UserLink username={user.username} />
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
                <PostIcons
                  postId={numberPostId}
                  liked={post.liked}
                  saved={post.saved}
                />
                <PostLikes likes={post.likes} />
                <span className={styles.created_at}>
                  {moment(post.created_at).fromNow()}
                </span>
              </div>
              <CommentForm postId={numberPostId} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};
