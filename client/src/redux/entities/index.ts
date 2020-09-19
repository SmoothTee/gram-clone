import { combineReducers } from "redux";

import { ActionTypes } from "../types";
import { EntityInitialState } from "./types";
import { READ_POSTS_SUCCESS } from "../post/constants";
import { Post, PostComment, PostMedia } from "../post/types";
import { User } from "../auth/types";

const userInitialState: EntityInitialState<User> = {
  byId: {},
};

const users = (state = userInitialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.users.reduce<{ [key: number]: User }>((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {}),
        },
      };
    default:
      return state;
  }
};

const postInitialState: EntityInitialState<Post> = {
  byId: {},
};

const posts = (state = postInitialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.posts.reduce<{ [key: number]: Post }>((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {}),
        },
      };
    default:
      return state;
  }
};

const postMediaInitialState: EntityInitialState<PostMedia> = {
  byId: {},
};

const postMedia = (state = postMediaInitialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.postMedia.reduce<{ [key: number]: PostMedia }>(
            (acc, curr) => {
              acc[curr.id] = curr;
              return acc;
            },
            {}
          ),
        },
      };
    default:
      return state;
  }
};

const commentInitialState: EntityInitialState<PostComment> = {
  byId: {},
};

const comments = (state = commentInitialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.comments.reduce<{ [key: number]: PostComment }>(
            (acc, curr) => {
              acc[curr.id] = curr;
              return acc;
            },
            {}
          ),
        },
      };
    default:
      return state;
  }
};

export const entities = combineReducers({
  users,
  posts,
  postMedia,
  comments,
});