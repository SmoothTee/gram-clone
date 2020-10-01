export interface Follower {
  user_id: number;
  follower_id: number;
  created_at: string;
  updated_at: string;
}

export interface UserFollowers {
  items: number[];
  isFetching: boolean;
  cursor: string | null;
}

export interface FollowerState {
  byUserId: {
    [key: number]: UserFollowers;
  };
  byFollowerId: {
    [key: number]: UserFollowers;
  };
}
