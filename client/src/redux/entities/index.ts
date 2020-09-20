import { combineReducers } from "redux";

import { ActionTypes } from "../types";
import { EntityInitialState } from "./types";
import {
  LIKE_POST_SUCCESS,
  READ_POSTS_SUCCESS,
  SAVE_POST_SUCCESS,
  UNLIKE_POST_SUCCESS,
  UNSAVE_POST_SUCCESS,
} from "../post/constants";
import { Post, PostComment, PostMedia } from "../post/types";
import { User } from "../auth/types";
import { CREATE_COMMENT_SUCCESS } from "../comment/constants";

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
    case LIKE_POST_SUCCESS:
      const likePost = { ...state.byId[action.like.post_id] };
      likePost.liked = 1;
      likePost.likes += 1;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.like.post_id]: likePost,
        },
      };
    case UNLIKE_POST_SUCCESS:
      const unlikePost = { ...state.byId[action.like.post_id] };
      delete unlikePost.liked;
      unlikePost.likes -= 1;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.like.post_id]: unlikePost,
        },
      };
    case SAVE_POST_SUCCESS:
      const savePost = { ...state.byId[action.savedPost.post_id] };
      savePost.saved = true;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.savedPost.post_id]: savePost,
        },
      };
    case UNSAVE_POST_SUCCESS:
      const unsavePost = { ...state.byId[action.unsavedPost.post_id] };
      delete unsavePost.saved;

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.unsavedPost.post_id]: unsavePost,
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
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.comment.id]: action.comment,
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
