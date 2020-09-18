import { clientFetch } from "../../utils/clientFetch";
import { AppThunk } from "../types";
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from "./constants";
import { PostActionTypes } from "./types";

const createPostRequest = (): PostActionTypes => ({
  type: CREATE_POST_REQUEST,
});

const createPostSuccess = (): PostActionTypes => ({
  type: CREATE_POST_SUCCESS,
});

const createPostFailure = (error?: any): PostActionTypes => ({
  type: CREATE_POST_FAILURE,
  error,
});

export const createPostAction = (formData: FormData): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(createPostRequest());
    const { success, res } = await clientFetch(
      "/api/post",
      {
        body: formData,
      },
      true
    );
    if (success) {
      dispatch(createPostSuccess());
    } else {
      dispatch(createPostFailure());
    }
  } catch (err) {
    dispatch(createPostFailure(`Failed to create post: ${err}`));
  }
};
