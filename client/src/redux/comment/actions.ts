import { clientFetch } from "../../utils/clientFetch";
import { PostComment } from "../post/types";
import { AppThunk } from "../types";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
} from "./constants";
import { CommentActionTypes } from "./types";

const createCommentRequest = (postId: number): CommentActionTypes => ({
  type: CREATE_COMMENT_REQUEST,
  postId,
});

const createCommentSuccess = (
  comment: PostComment,
  postId: number
): CommentActionTypes => ({
  type: CREATE_COMMENT_SUCCESS,
  comment,
  postId,
});

const createCommentFailure = (
  error: any,
  postId: number
): CommentActionTypes => ({
  type: CREATE_COMMENT_FAILURE,
  error,
  postId,
});

export const createCommentAction = (
  post_id: number,
  text: string,
  parent_id?: number
): AppThunk => async (dispatch) => {
  try {
    dispatch(createCommentRequest(post_id));

    const { success, res } = await clientFetch("/api/comment", {
      body: { post_id, text, parent_id },
    });
    if (success) {
      dispatch(createCommentSuccess(res.comment, post_id));
    } else {
      dispatch(createCommentFailure(res, post_id));
    }
  } catch (err) {
    dispatch(createCommentFailure(`Failed to create comment: ${err}`, post_id));
  }
};
