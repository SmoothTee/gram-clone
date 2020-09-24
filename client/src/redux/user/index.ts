import { meAction } from "../auth/actions";
import { PostsState } from "../post/types";
import {
  READ_PROFILE_FAILURE,
  READ_PROFILE_REQUEST,
  READ_PROFILE_SUCCESS,
} from "./constants";
import { UserState, UserActionTypes } from "./types";

const initialUserState: UserState = {
  item: null,
  isFetching: false,
  lastUpdated: null,
};

const user = (state = initialUserState, action: UserActionTypes) => {
  switch (action.type) {
    case READ_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case READ_PROFILE_SUCCESS:
      console.log("Action: ", action);
      return {
        ...state,
        isFetching: false,
        item: action.user.id,
        lastUpdated: new Date(),
      };
    case READ_PROFILE_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export const profileByUsername = (
  state: { [key: string]: UserState } = {},
  action: UserActionTypes
) => {
  switch (action.type) {
    case READ_PROFILE_REQUEST:
    case READ_PROFILE_SUCCESS:
    case READ_PROFILE_FAILURE:
      return {
        ...state,
        [action.username]: user(state[action.username], action),
      };
    default:
      return state;
  }
};

const initialPostState: PostsState = {
  items: [],
  isFetching: false,
  lastUpdated: null,
};

const posts = (state = initialPostState, action: UserActionTypes) => {
  switch (action.type) {
    case READ_PROFILE_SUCCESS:
      return {
        ...state,
        items: action.posts.map((p) => p.id),
        isFetching: false,
        lastUpdated: new Date(),
      };
    default:
      return state;
  }
};

export const postsByUsername = (
  state: { [key: string]: PostsState } = {},
  action: UserActionTypes
) => {
  switch (action.type) {
    case READ_PROFILE_SUCCESS:
      return {
        ...state,
        [action.username]: posts(state[action.username], action),
      };
    default:
      return state;
  }
};
