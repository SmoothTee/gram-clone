import { clientFetch } from "../../utils/clientFetch";
import { User } from "../auth/types";
import { Post, PostMedia } from "../post/types";
import { AppThunk } from "../types";
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
import { UserActionTypes } from "./types";

const readProfileRequest = (username: string): UserActionTypes => ({
  type: READ_PROFILE_REQUEST,
  username,
});

const readProfileSuccess = (data: {
  user: User;
  posts: Post[];
  postMedia: PostMedia[];
}): UserActionTypes => ({
  type: READ_PROFILE_SUCCESS,
  username: data.user.username,
  user: data.user,
  posts: data.posts,
  postMedia: data.postMedia,
});

const readProfileFailure = (error: any, username: string): UserActionTypes => ({
  type: READ_PROFILE_FAILURE,
  error,
  username,
});

const updateUserRequest = (): UserActionTypes => ({
  type: UPDATE_USER_REQUEST,
});

const updateUserSuccess = (user: User): UserActionTypes => ({
  type: UPDATE_USER_SUCCESS,
  user,
});

const updateUserFailure = (error: any): UserActionTypes => ({
  type: UPDATE_USER_FAILURE,
  error,
});

const changePasswordRequest = (): UserActionTypes => ({
  type: CHANGE_PASSWORD_REQUEST,
});

const changePasswordSuccess = (): UserActionTypes => ({
  type: CHANGE_PASSWORD_SUCCESS,
});

const changePasswordFailure = (error?: any): UserActionTypes => ({
  type: CHANGE_PASSWORD_FAILURE,
  error,
});

export const readProfileAction = (username: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(readProfileRequest(username));
    const { success, res } = await clientFetch(
      `/api/user/username/${username}`
    );
    if (success) {
      dispatch(readProfileSuccess(res));
    } else {
      dispatch(readProfileFailure(res, username));
    }
  } catch (err) {
    dispatch(readProfileFailure(`Failed to read profile: ${err}`, username));
  }
};

export const updateUserAction = <T>(
  data: T,
  userId: number
): AppThunk => async (dispatch) => {
  try {
    dispatch(updateUserRequest());
    const { success, res } = await clientFetch(`/api/user/${userId}`, {
      method: "PUT",
      body: data,
    });
    if (success) {
      dispatch(updateUserSuccess(res.user));
    } else {
      dispatch(updateUserFailure(res));
    }
  } catch (err) {
    dispatch(updateUserFailure(`Failed to update user: ${err}`));
  }
};

export const changePasswordAction = <T>(body: T): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(changePasswordRequest());
    const { success } = await clientFetch("/api/user/change-password", {
      method: "PATCH",
      body,
    });
    if (success) {
      dispatch(changePasswordSuccess());
    } else {
      dispatch(changePasswordFailure());
    }
  } catch (err) {
    dispatch(changePasswordFailure(`Failed to change password: ${err}`));
  }
};
