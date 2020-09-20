import { READ_POSTS_SUCCESS } from "../post/constants";
import { ActionTypes } from "../types";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from "./constants";
import { CommentState } from "./types";

const initialState: CommentState = {
  items: [],
  isFetching: false,
  isCreating: false,
};

const comments = (state = initialState, action: ActionTypes) => {
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
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        items: action.comments
          .filter((c) => c.post_id === action.pId)
          .map((c) => c.id),
      };
    default:
      return state;
  }
};

export const commentsByPostId = (
  state: { [key: number]: CommentState } = {},
  action: ActionTypes
) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
    case CREATE_COMMENT_SUCCESS:
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        [action.postId]: comments(state[action.postId], action),
      };
    case READ_POSTS_SUCCESS:
      const uniquePostIds = [...new Set(action.comments.map((c) => c.post_id))];
      return {
        ...state,
        ...uniquePostIds.reduce<{ [key: number]: CommentState }>(
          (acc, curr) => {
            acc[curr] = comments(state[curr], { ...action, pId: curr });
            return acc;
          },
          {}
        ),
      };
    default:
      return state;
  }
};
