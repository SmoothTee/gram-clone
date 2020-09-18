import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from "./constants";

export interface PostState {
  isCreating: boolean;
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

export type PostActionTypes =
  | CreatePostRequestAction
  | CreatePostSuccessAction
  | CreatePostFailureAction;
