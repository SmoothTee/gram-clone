import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "../../components/Layout";
import { readPostsAction } from "../../redux/post/actions";

import styles from "./PostFeed.module.css";

export const PostFeed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readPostsAction());
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <span>Post Feed</span>
      </div>
    </Layout>
  );
};
