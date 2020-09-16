import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

import { appReducer } from "./index";
import { AuthActionTypes } from "./auth/types";

export type AppReducerParameters = Parameters<typeof appReducer>;

export type RootState = ReturnType<typeof appReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type ActionTypes = AuthActionTypes;
