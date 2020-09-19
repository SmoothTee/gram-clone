import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from "./constants";
import { CommentActionTypes, CommentState } from "./types";

const initialState: CommentState = {
  items: [],
  isFetching: false,
  isCreating: false,
};

const comments = (state = initialState, action: CommentActionTypes) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        isCreating: false,
        items: [action.comment.id, ...state.items],
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        isCreating: false,
      };
    default:
      return state;
  }
};

export const commentsByPostId = (
  state: { [key: number]: CommentState } = {},
  action: CommentActionTypes
) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
    case CREATE_COMMENT_SUCCESS:
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        [action.postId]: comments(state[action.postId], action),
      };
    default:
      return state;
  }
};
