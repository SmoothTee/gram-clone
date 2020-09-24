import { User } from "../auth/types";
import { Post, PostMedia } from "../post/types";
import {
  READ_PROFILE_FAILURE,
  READ_PROFILE_REQUEST,
  READ_PROFILE_SUCCESS,
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

export type UserActionTypes =
  | ReadProfileRequestAction
  | ReadProfileSuccessAction
  | ReadProfileFailureAction;
