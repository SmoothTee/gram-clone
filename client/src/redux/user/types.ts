import { User } from "../auth/types";
import { Post, PostMedia } from "../post/types";
import {
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  READ_PROFILE_FAILURE,
  READ_PROFILE_REQUEST,
  READ_PROFILE_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./constants";

export interface UserState {
  item: number | null;
  isFetching: boolean;
  lastUpdated: string | null;
}

interface ReadProfileRequestAction {
  type: typeof READ_PROFILE_REQUEST;
  username: string;
}

interface ReadProfileSuccessAction {
  type: typeof READ_PROFILE_SUCCESS;
  username: string;
  user: User;
  posts: Post[];
  postMedia: PostMedia[];
}

interface ReadProfileFailureAction {
  type: typeof READ_PROFILE_FAILURE;
  error: any;
  username: string;
}

interface UpdateUserRequestAction {
  type: typeof UPDATE_USER_REQUEST;
}

interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
  user: User;
}

interface UpdateUserFailureAction {
  type: typeof UPDATE_USER_FAILURE;
  error: any;
}

interface ChangePasswordRequestAction {
  type: typeof CHANGE_PASSWORD_REQUEST;
}

interface ChangePasswordSuccessAction {
  type: typeof CHANGE_PASSWORD_SUCCESS;
}

interface ChangePasswordFailureAction {
  type: typeof CHANGE_PASSWORD_FAILURE;
  error?: any;
}

export type UserActionTypes =
  | ReadProfileRequestAction
  | ReadProfileSuccessAction
  | ReadProfileFailureAction
  | UpdateUserRequestAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | ChangePasswordRequestAction
  | ChangePasswordSuccessAction
  | ChangePasswordFailureAction;
