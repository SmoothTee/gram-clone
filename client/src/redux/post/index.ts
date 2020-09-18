import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  READ_POSTS_FAILURE,
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
} from "./constants";
import { PostActionTypes } from "./types";

const initialState = {
  items: [],
  isCreating: false,
  isFetching: false,
};

export const post = (state = initialState, action: PostActionTypes) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case READ_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_POST_SUCCESS:
    case CREATE_POST_FAILURE:
      return {
        ...state,
        isCreating: false,
      };
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        items: [...state.items, ...action.posts.map((p) => p.id)],
        isFetching: false,
      };
    case READ_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
