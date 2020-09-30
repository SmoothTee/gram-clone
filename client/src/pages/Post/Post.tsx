import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./Post.module.css";
import { Layout } from "../../components/Layout";
import { readPostAction } from "../../redux/post/actions";
import { useTypedSelector } from "../../redux/hooks";
import { PostPanorama } from "../../components/PostPanorama";

export const Post = () => {
  const dispatch = useDispatch();

  const { post_id } = useParams<{ post_id: string }>();

  const { isFetching, item } = useTypedSelector((state) => state.post);

  const numberPostId = Number(post_id);

  useEffect(() => {
    dispatch(readPostAction(numberPostId));
  }, []);

  if (isFetching || !item) {
    return <span>Loading</span>;
  } else {
    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <PostPanorama postId={numberPostId} />
          </div>
        </div>
      </Layout>
    );
  }
};
