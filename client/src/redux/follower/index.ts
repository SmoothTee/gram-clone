import { LOGIN_SUCCESS } from "../auth/constants";
import { ActionTypes } from "../types";
import {
  FOLLOW_SUCCESS,
  READ_FOLLOWER_SUGGESTIONS_SUCCESS,
  UNFOLLOW_SUCCESS,
} from "./constants";
import {
  FollowerActionTypes,
  FollowerState,
  FollowerSuggestionsState,
  UserFollowers,
} from "./types";

const userFollowersInitialState: UserFollowers = {
  items: [],
  isFetching: false,
  cursor: null,
};

const userFollowers = (
  state = userFollowersInitialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        items: action.followers,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        items: state.items.concat(action.follower),
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        items: state.items.filter(
          (f) =>
            f.user_id !== action.follower.user_id &&
            f.follower_id !== action.follower.follower_id
        ),
      };
    default:
      return state;
  }
};

const initialState: FollowerState = {
  byUserId: {},
  byFollowerId: {},
};

export const follower = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        byFollowerId: {
          ...state.byFollowerId,
          [action.user.id]: userFollowers(
            state.byFollowerId[action.user.id],
            action
          ),
        },
      };
    case FOLLOW_SUCCESS:
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        byFollowerId: {
          ...state.byFollowerId,
          [action.follower.follower_id]: userFollowers(
            state.byFollowerId[action.follower.follower_id],
            action
          ),
        },
      };
    default:
      return state;
  }
};

const followerSuggestionsInitialState: FollowerSuggestionsState = {
  items: [],
  isFetching: false,
  cursor: null,
};

export const followerSuggestions = (
  state = followerSuggestionsInitialState,
  action: FollowerActionTypes
) => {
  switch (action.type) {
    case READ_FOLLOWER_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        items: [
          ...new Set(
            state.items.concat(action.followerSuggestions.map((u) => u.id))
          ),
        ],
      };
    default:
      return state;
  }
};
