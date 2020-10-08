import { User } from "../auth/types";
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  READ_FOLLOWER_SUGGESTIONS_FAILURE,
  READ_FOLLOWER_SUGGESTIONS_REQUEST,
  READ_FOLLOWER_SUGGESTIONS_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  READ_FOLLOWERS_REQUEST,
  READ_FOLLOWERS_SUCCESS,
  READ_FOLLOWERS_FAILURE,
} from "./constants";

export interface Follower {
  user_id: number;
  follower_id: number;
  created_at: string;
  updated_at: string;
}

export interface UserFollowers {
  items: Follower[];
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

export interface FollowerSuggestionsState {
  items: number[];
  isFetching: boolean;
  cursor: string | null;
}

interface ReadFollowerSuggestionsRequestAction {
  type: typeof READ_FOLLOWER_SUGGESTIONS_REQUEST;
}

interface ReadFollowerSuggestionsSuccessAction {
  type: typeof READ_FOLLOWER_SUGGESTIONS_SUCCESS;
  followerSuggestions: User[];
}

interface ReadFollowerSuggestionsFailureAction {
  type: typeof READ_FOLLOWER_SUGGESTIONS_FAILURE;
  error: any;
}

interface FollowRequestAction {
  type: typeof FOLLOW_REQUEST;
}

interface FollowSuccessAction {
  type: typeof FOLLOW_SUCCESS;
  follower: Follower;
}

interface FollowFailureAction {
  type: typeof FOLLOW_FAILURE;
  error: any;
}

interface UnfollowRequestAction {
  type: typeof UNFOLLOW_REQUEST;
}

interface UnfollowSuccessAction {
  type: typeof UNFOLLOW_SUCCESS;
  follower: Follower;
}

interface UnfollowFailureAction {
  type: typeof UNFOLLOW_FAILURE;
  error: any;
}

interface ReadFollowersRequestAction {
  type: typeof READ_FOLLOWERS_REQUEST;
  userId: number;
}

interface ReadFollowersSuccessAction {
  type: typeof READ_FOLLOWERS_SUCCESS;
  followers: Follower[];
  users: User[];
  userId: number;
}

interface ReadFollowersFailureAction {
  type: typeof READ_FOLLOWERS_FAILURE;
  error: any;
  userId: number;
}

export type FollowerActionTypes =
  | ReadFollowerSuggestionsRequestAction
  | ReadFollowerSuggestionsSuccessAction
  | ReadFollowerSuggestionsFailureAction
  | FollowRequestAction
  | FollowSuccessAction
  | FollowFailureAction
  | UnfollowRequestAction
  | UnfollowSuccessAction
  | UnfollowFailureAction
  | ReadFollowersRequestAction
  | ReadFollowersSuccessAction
  | ReadFollowersFailureAction;
