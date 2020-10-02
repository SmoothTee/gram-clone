import { User } from "../auth/types";
import {
  READ_FOLLOWER_SUGGESTIONS_FAILURE,
  READ_FOLLOWER_SUGGESTIONS_REQUEST,
  READ_FOLLOWER_SUGGESTIONS_SUCCESS,
} from "./constants";

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

export type FollowerActionTypes =
  | ReadFollowerSuggestionsRequestAction
  | ReadFollowerSuggestionsSuccessAction
  | ReadFollowerSuggestionsFailureAction;
