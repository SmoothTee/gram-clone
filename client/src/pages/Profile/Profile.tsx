import React from "react";

import styles from "./Profile.module.css";
import { Layout } from "../../components/Layout";

export const Profile = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <span>Profile</span>
      </div>
    </Layout>
  );
};
