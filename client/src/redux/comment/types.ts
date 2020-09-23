import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_FAILURE,
  UNLIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_SUCCESS,
} from "./constants";

export interface PostComment {
  id: number;
  user_id: number;
  post_id: number;
  parent_id?: number;
  text: string;
  created_at: string;
  updated_at: string;
  liked: boolean;
  likes: number;
}

export interface CommentLike {
  comment_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CommentState {
  items: number[];
  isFetching: boolean;
  isCreating: boolean;
}

interface CreateCommentRequestAction {
  type: typeof CREATE_COMMENT_REQUEST;
  postId: number;
}

interface CreateCommentSuccessAction {
  type: typeof CREATE_COMMENT_SUCCESS;
  comment: PostComment;
  postId: number;
}

interface CreateCommentFailureAction {
  type: typeof CREATE_COMMENT_FAILURE;
  error: any;
  postId: number;
}

interface LikeCommentRequestAction {
  type: typeof LIKE_COMMENT_REQUEST;
}

interface LikeCommentSuccessAction {
  type: typeof LIKE_COMMENT_SUCCESS;
  commentLike: CommentLike;
}

interface LikeCommentFailureAction {
  type: typeof LIKE_COMMENT_FAILURE;
  error: any;
}

interface UnlikeCommentRequestAction {
  type: typeof UNLIKE_COMMENT_REQUEST;
}

interface UnlikeCommentSuccessAction {
  type: typeof UNLIKE_COMMENT_SUCCESS;
  commentLike: CommentLike;
}

interface UnlikeCommentFailureAction {
  type: typeof UNLIKE_COMMENT_FAILURE;
  error: any;
}

export type CommentActionTypes =
  | CreateCommentRequestAction
  | CreateCommentSuccessAction
  | CreateCommentFailureAction
  | LikeCommentRequestAction
  | LikeCommentSuccessAction
  | LikeCommentFailureAction
  | UnlikeCommentRequestAction
  | UnlikeCommentSuccessAction
  | UnlikeCommentFailureAction;
