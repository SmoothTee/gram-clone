import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./Profile.module.css";
import { Layout } from "../../components/Layout";
import { readProfileAction } from "../../redux/user/actions";
import { useTypedSelector } from "../../redux/hooks";
import { Button } from "../../components/Button";
import { Tab } from "../../components/Tab";
import { TabItem } from "../../components/Tab/components/TabItem";
import { BsBookmark, BsGrid3X3 } from "react-icons/bs";
import { PostQuadrat } from "../../components/PostQuadrat/PostQuadrat";
import { readSavedPostsAction } from "../../redux/post/actions";
import { showModal } from "../../redux/modal/actions";

export const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { username } = useParams<{ username: string }>();

  const { users } = useTypedSelector((state) => state.entities);
  const profileByUsername = useTypedSelector(
    (state) => state.profileByUsername
  );
  const postsByUsername = useTypedSelector((state) => state.postsByUsername);
  const sessionId = useTypedSelector((state) => state.auth.session);
  const savedPosts = useTypedSelector((state) => state.savedPosts.items);

  useEffect(() => {
    dispatch(readProfileAction(username));
  }, []);

  useEffect(() => {
    if (location.pathname === `/profile/${username}/saved`) {
      dispatch(readSavedPostsAction());
    }
  }, [location.pathname]);

  const profile = profileByUsername[username];

  if (!profileByUsername[username] || profile.isFetching || !profile.item) {
    return <span>Loading</span>;
  } else {
    const user = users.byId[profile.item];
    const avatarUrl = user.avatar_url
      ? user.avatar_url
      : "https://avatars.dicebear.com/api/male/john.svg?mood[]=happy";
    const postIds = postsByUsername[username].items;

    return (
      <Layout>
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.details}>
              <img className={styles.avatar} src={avatarUrl} alt="avatar" />
              <div className={styles.header}>
                <span className={styles.username}>{user.username}</span>
                {sessionId === user.id ? null : <Button>Follow</Button>}
              </div>
              <div className={styles.numbers}>
                <span className={styles.fact}>
                  <b>{user.num_of_posts}</b> post
                  {user.num_of_posts === 1 ? "" : "s"}
                </span>
                <button
                  className={styles.button}
                  onClick={() =>
                    dispatch(
                      showModal("FollowerModal", {
                        title: "Follower",
                        userIds: [1, 2, 3, 4],
                      })
                    )
                  }
                >
                  <span className={styles.fact}>
                    <b>{user.num_of_followers}</b> follower
                    {user.num_of_followers === 1 ? "" : "s"}
                  </span>
                </button>
                <button
                  className={styles.button}
                  onClick={() =>
                    dispatch(
                      showModal("FollowerModal", {
                        title: "Following",
                        userIds: [1, 2, 3, 4],
                      })
                    )
                  }
                >
                  <span className={styles.fact}>
                    <b>{user.num_of_followings}</b> following
                  </span>
                </button>
              </div>
              <span className={styles.full_name}>{user.full_name}</span>
            </div>
            <Tab>
              <TabItem path={`/profile/${username}`}>
                <BsGrid3X3 />
                <span>Posts</span>
              </TabItem>
              {sessionId === user.id ? (
                <TabItem path={`/profile/${username}/saved`}>
                  <BsBookmark />
                  <span>Saved</span>
                </TabItem>
              ) : null}
            </Tab>
            <div className={styles.post_grid}>
              {location.pathname === `/profile/${username}/saved`
                ? savedPosts.map((sp) => (
                    <PostQuadrat key={sp.post_id} postId={sp.post_id} />
                  ))
                : postIds.map((pId) => <PostQuadrat key={pId} postId={pId} />)}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
};
