import React from "react";
import { useTypedSelector } from "../../redux/hooks";
import { FollowSuggestion } from "../FollowSuggestion";

import styles from "./Suggestions.module.css";

export const Suggestions = () => {
  const userIds = useTypedSelector((state) => state.followerSuggestions.items);

  return (
    <div className={styles.container}>
      {userIds.map((uId) => (
        <FollowSuggestion key={uId} userId={uId} />
      ))}
    </div>
  );
};
