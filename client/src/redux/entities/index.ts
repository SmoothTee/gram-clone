import { combineReducers } from "redux";

import { ActionTypes } from "../types";
import { EntityInitialState } from "./types";
import {
  LIKE_POST_SUCCESS,
  READ_POSTS_SUCCESS,
  READ_POST_SUCCESS,
  SAVE_POST_SUCCESS,
  UNLIKE_POST_SUCCESS,
  UNSAVE_POST_SUCCESS,
} from "../post/constants";
import { Post, PostMedia } from "../post/types";
import { User } from "../auth/types";
import {
  CREATE_COMMENT_SUCCESS,
  LIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_SUCCESS,
} from "../comment/constants";
import { PostComment } from "../comment/types";
import { READ_PROFILE_SUCCESS, UPDATE_USER_SUCCESS } from "../user/constants";
import { LOGIN_SUCCESS, ME_SUCCESS, REGISTER_SUCCESS } from "../auth/constants";

const userInitialState: EntityInitialState<User> = {
  byId: {},
};

const users = (state = userInitialState, action: ActionTypes) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case ME_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
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
    case READ_POST_SUCCESS:
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
    case READ_PROFILE_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.user.id]: action.user,
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
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.postId]: {
            ...state.byId[action.postId],
            num_of_comments: state.byId[action.postId].num_of_comments += 1,
          },
        },
      };
    case READ_POST_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.post.id]: action.post,
        },
      };
    case READ_PROFILE_SUCCESS:
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
    case READ_POST_SUCCESS:
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
    case READ_PROFILE_SUCCESS:
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
    case LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.commentLike.comment_id]: {
            ...state.byId[action.commentLike.comment_id],
            liked: true,
            likes: state.byId[action.commentLike.comment_id].likes
              ? (state.byId[action.commentLike.comment_id].likes += 1)
              : 1,
          },
        },
      };
    case UNLIKE_COMMENT_SUCCESS:
      const unlikedPost = { ...state.byId[action.commentLike.comment_id] };

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.commentLike.comment_id]: {
            ...unlikedPost,
            liked: false,
            likes: unlikedPost.likes -= 1,
          },
        },
      };
    case READ_POST_SUCCESS:
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
