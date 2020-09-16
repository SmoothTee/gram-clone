import React from "react";
import { Layout } from "../../components/Layout";

import styles from "./PostFeed.module.css";

export const PostFeed = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <span>Post Feed</span>
      </div>
    </Layout>
  );
};
