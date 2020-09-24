import { clientFetch } from "../../utils/clientFetch";
import { User } from "../auth/types";
import { Post, PostMedia } from "../post/types";
import { AppThunk } from "../types";
import {
  READ_PROFILE_FAILURE,
  READ_PROFILE_REQUEST,
  READ_PROFILE_SUCCESS,
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

export const readProfileAction = (username: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(readProfileRequest(username));
    const { success, res } = await clientFetch(`/api/user/${username}`);
    if (success) {
      dispatch(readProfileSuccess(res));
    } else {
      dispatch(readProfileFailure(res, username));
    }
  } catch (err) {
    dispatch(readProfileFailure(`Failed to read profile: ${err}`, username));
  }
};
