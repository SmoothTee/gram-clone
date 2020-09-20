import { User } from "../auth/types";
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
  READ_POSTS_REQUEST,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  UNSAVE_POST_FAILURE,
  UNSAVE_POST_REQUEST,
  UNSAVE_POST_SUCCESS,
} from "./constants";

export interface Post {
  id: number;
  user_id: number;
  caption: string;
  created_at: string;
  updated_at: string;
  num_of_comments: number;
  likes: number;
  liked?: number;
  saved?: boolean;
}

export interface PostMedia {
  id: number;
  post_id: number;
  media_type: string;
  public_id: string;
  media_url: string;
  created_at: string;
  updated_at: string;
}

export interface PostComment {
  id: number;
  user_id: number;
  post_id: number;
  parent_id?: number;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface PostLike {
  post_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface SavedPost {
  post_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface PostState {
  items: number[];
  isCreating: boolean;
  isFetching: boolean;
}

interface CreatePostRequestAction {
  type: typeof CREATE_POST_REQUEST;
}

interface CreatePostSuccessAction {
  type: typeof CREATE_POST_SUCCESS;
}

interface CreatePostFailureAction {
  type: typeof CREATE_POST_FAILURE;
  error?: any;
}

interface ReadPostsRequestAction {
  type: typeof READ_POSTS_REQUEST;
}

interface ReadPostsSuccessAction {
  type: typeof READ_POSTS_SUCCESS;
  posts: Post[];
  users: User[];
  postMedia: PostMedia[];
  comments: PostComment[];
  pId?: number;
}

interface ReadPostsFailureAction {
  type: typeof READ_POSTS_FAILURE;
  error: any;
}

interface LikePostRequestAction {
  type: typeof LIKE_POST_REQUEST;
}

interface LikePostSuccessAction {
  type: typeof LIKE_POST_SUCCESS;
  like: PostLike;
}

interface LikePostFailureAction {
  type: typeof LIKE_POST_FAILURE;
  error: any;
}

interface UnlikePostRequestAction {
  type: typeof UNLIKE_POST_REQUEST;
}

interface UnlikePostSuccessAction {
  type: typeof UNLIKE_POST_SUCCESS;
  like: PostLike;
}

interface UnlikePostFailureAction {
  type: typeof UNLIKE_POST_FAILURE;
  error: any;
}

interface SavePostRequestAction {
  type: typeof SAVE_POST_REQUEST;
}

interface SavePostSuccessAction {
  type: typeof SAVE_POST_SUCCESS;
  savedPost: SavedPost;
}

interface SavePostFailureAction {
  type: typeof SAVE_POST_FAILURE;
  error: any;
}

interface UnsavePostRequestAction {
  type: typeof UNSAVE_POST_REQUEST;
}

interface UnsavePostSuccessAction {
  type: typeof UNSAVE_POST_SUCCESS;
  unsavedPost: SavedPost;
}

interface UnsavePostFailureAction {
  type: typeof UNSAVE_POST_FAILURE;
  error: any;
}

export type PostActionTypes =
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | ReadPostsRequestAction
  | ReadPostsSuccessAction
  | ReadPostsFailureAction
  | LikePostRequestAction
  | LikePostSuccessAction
  | LikePostFailureAction
  | UnlikePostRequestAction
  | UnlikePostSuccessAction
  | UnlikePostFailureAction
  | SavePostRequestAction
  | SavePostSuccessAction
  | SavePostFailureAction
  | UnsavePostRequestAction
  | UnsavePostSuccessAction
  | UnsavePostFailureAction;
