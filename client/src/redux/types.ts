import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { appReducer } from "./index";
import { AuthActionTypes } from "./auth/types";
import { UserActionTypes } from "./user/types";
import { PostActionTypes } from "./post/types";
import { CommentActionTypes } from "./comment/types";
import { FollowerActionTypes } from "./follower/types";

export type AppReducerParameters = Parameters<typeof appReducer>;

export type RootState = ReturnType<typeof appReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type ActionTypes =
  | AuthActionTypes
  | UserActionTypes
  | PostActionTypes
  | CommentActionTypes
  | FollowerActionTypes;
