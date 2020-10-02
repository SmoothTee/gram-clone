import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "../../components/Layout";
import { PostCard } from "../../components/PostCard";
import { Suggestions } from "../../components/Suggestions";
import { UserLink } from "../../components/UserLink";
import { readFollowerSuggestionsAction } from "../../redux/follower/actions";
import { useTypedSelector } from "../../redux/hooks";
import { readPostsAction } from "../../redux/post/actions";

import styles from "./PostFeed.module.css";

export const PostFeed = () => {
  const dispatch = useDispatch();

  const isFetching = useTypedSelector((state) => state.postFeed.isFetching);
  const postItems = useTypedSelector((state) => state.postFeed.items);
  const sessionId = useTypedSelector((state) => state.auth.session);

  useEffect(() => {
    dispatch(readPostsAction());
    dispatch(readFollowerSuggestionsAction());
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
        <aside className={styles.sidebar}>
          <UserLink userId={sessionId as number} />
          <Suggestions />
        </aside>
      </div>
    </Layout>
  );
};
