import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "../../components/Layout";
import { PostCard } from "../../components/PostCard";
import { useTypedSelector } from "../../redux/hooks";
import { readPostsAction } from "../../redux/post/actions";

import styles from "./PostFeed.module.css";

export const PostFeed = () => {
  const dispatch = useDispatch();

  const isFetching = useTypedSelector((state) => state.post.isFetching);
  const postItems = useTypedSelector((state) => state.post.items);

  useEffect(() => {
    dispatch(readPostsAction());
  }, []);

  if (isFetching) {
    return <span>Loading</span>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.posts}>
          {postItems.map((pId) => (
            <PostCard key={pId} postId={pId} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
