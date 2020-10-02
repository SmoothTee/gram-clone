import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./FollowSuggestion.module.css";
import { Button } from "../Button";
import { useTypedSelector } from "../../redux/hooks";
import { followAction } from "../../redux/follower/actions";

interface FollowSuggestionProps {
  userId: number;
}

export const FollowSuggestion = ({ userId }: FollowSuggestionProps) => {
  const dispatch = useDispatch();

  const sessionId = useTypedSelector((state) => state.auth.session);
  const users = useTypedSelector((state) => state.entities.users);
  const followerById = useTypedSelector((state) => state.follower.byFollowerId);

  const user = users.byId[userId];

  const avatar = user.avatar_url
    ? user.avatar_url
    : "https://avatars.dicebear.com/api/male/john.svg?mood[]=happy";

  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={avatar} alt="avatar" />
      <Link className={styles.username} to={`/profile/${user.username}`}>
        {user.username}
      </Link>
      <span className={styles.full_name}>{user.full_name}</span>
      <Button onClick={() => dispatch(followAction(user.id))}>Follow</Button>
    </div>
  );
};
