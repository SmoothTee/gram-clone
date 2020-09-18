import { User } from "../auth/types";
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  READ_POSTS_SUCCESS,
  READ_POSTS_FAILURE,
  READ_POSTS_REQUEST,
} from "./constants";

export interface Post {
  id: number;
  user_id: number;
  caption: string;
  created_at: string;
  updated_at: string;
  num_of_comments: number;
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

export interface PostState {
  items: Post[];
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
}

interface ReadPostsFailureAction {
  type: typeof READ_POSTS_FAILURE;
  error: any;
}

export type PostActionTypes =
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction
  | ReadPostsRequestAction
  | ReadPostsSuccessAction
  | ReadPostsFailureAction;
