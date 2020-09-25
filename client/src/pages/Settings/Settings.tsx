import React from "react";
import { NavLink, Route } from "react-router-dom";
import { ChangePassword } from "../../components/ChangePassword";
import { EditProfile } from "../../components/EditProfile";
import { Layout } from "../../components/Layout";

import styles from "./Settings.module.css";

export const Settings = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <aside className={styles.sidebar}>
            <NavLink
              className={styles.sidelink}
              activeClassName={styles.active_sidelink}
              to="/settings/edit-profile"
            >
              Edit Profile
            </NavLink>
            <NavLink
              className={styles.sidelink}
              activeClassName={styles.active_sidelink}
              to="/settings/change-password"
            >
              Change Password
            </NavLink>
          </aside>
          <div className={styles.main}>
            <Route exact path="/settings/edit-profile">
              <EditProfile />
            </Route>
            <Route exact path="/settings/change-password">
              <ChangePassword />
            </Route>
          </div>
        </div>
      </div>
    </Layout>
  );
};
