import { LOGIN_SUCCESS } from "../auth/constants";
import { ActionTypes } from "../types";
import { FollowerState, UserFollowers } from "./types";

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
    default:
      return state;
  }
};
