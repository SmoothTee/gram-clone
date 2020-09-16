import React from "react";

import styles from "./Home.module.css";
import { useTypedSelector } from "../../redux/hooks";
import { PostFeed } from "../PostFeed";
import { Login } from "../Login";

export const Home = () => {
  const isAuthenticated = useTypedSelector(
    (state) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <PostFeed />;
  }

  return <Login />;
};
