import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  READ_POSTS_FAILURE,
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  READ_POST_FAILURE,
  READ_POST_REQUEST,
  READ_POST_SUCCESS,
  READ_SAVED_POSTS_REQUEST,
  READ_SAVED_POSTS_SUCCESS,
} from "./constants";
import { PostActionTypes, PostState } from "./types";

const initialState = {
  items: [],
  isCreating: false,
  isFetching: false,
  isLiking: false,
};

export const postFeed = (state = initialState, action: PostActionTypes) => {
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
        items: [...new Set([...state.items, ...action.posts.map((p) => p.id)])],
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

const postInitialState: PostState = {
  item: null,
  isFetching: false,
};

export const post = (state = postInitialState, action: PostActionTypes) => {
  switch (action.type) {
    case READ_POST_REQUEST:
      return {
        ...state,
        isFetching: true,
        item: action.postId,
      };
    case READ_POST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        item: action.post.id,
      };
    case READ_POST_FAILURE:
      return postInitialState;
    default:
      return state;
  }
};

const savedPostsInitialState = {
  items: [],
  isFetching: false,
  lastUpdated: null,
};

export const savedPosts = (
  state = savedPostsInitialState,
  action: PostActionTypes
) => {
  switch (action.type) {
    case READ_SAVED_POSTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case READ_SAVED_POSTS_SUCCESS:
      return {
        ...state,
        items: action.savedPosts,
        isFetching: false,
        lastUpdated: new Date(),
      };
    default:
      return state;
  }
};
