import { PostComment } from "../post/types";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from "./constants";

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

export type CommentActionTypes =
  | CreateCommentRequestAction
  | CreateCommentSuccessAction
  | CreateCommentFailureAction;
