import { clientFetch } from "../../utils/clientFetch";
import { AppThunk } from "../types";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_FAILURE,
  UNLIKE_COMMENT_REQUEST,
  UNLIKE_COMMENT_SUCCESS,
} from "./constants";
import { PostComment, CommentActionTypes, CommentLike } from "./types";

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

const likeCommentRequest = (): CommentActionTypes => ({
  type: LIKE_COMMENT_REQUEST,
});

const likeCommentSuccess = (commentLike: CommentLike): CommentActionTypes => ({
  type: LIKE_COMMENT_SUCCESS,
  commentLike,
});

const likeCommentFailure = (error: any): CommentActionTypes => ({
  type: LIKE_COMMENT_FAILURE,
  error,
});

const unlikeCommentRequest = (): CommentActionTypes => ({
  type: UNLIKE_COMMENT_REQUEST,
});

const unlikeCommentSuccess = (
  commentLike: CommentLike
): CommentActionTypes => ({
  type: UNLIKE_COMMENT_SUCCESS,
  commentLike,
});

const unlikeCommentFailure = (error: any): CommentActionTypes => ({
  type: UNLIKE_COMMENT_FAILURE,
  error,
});

export const createCommentAction = (
  post_id: number,
  text: string,
  cb: () => void,
  parent_id?: number
): AppThunk => async (dispatch) => {
  try {
    dispatch(createCommentRequest(post_id));

    const { success, res } = await clientFetch("/api/comment", {
      body: { post_id, text, parent_id },
    });
    if (success) {
      dispatch(createCommentSuccess(res.comment, post_id));
      cb();
    } else {
      dispatch(createCommentFailure(res, post_id));
    }
  } catch (err) {
    dispatch(createCommentFailure(`Failed to create comment: ${err}`, post_id));
  }
};

export const likeCommentAction = (commentId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(likeCommentRequest());
    const { success, res } = await clientFetch("/api/comment/like", {
      body: { commentId },
    });
    if (success) {
      dispatch(likeCommentSuccess(res.commentLike));
    } else {
      dispatch(likeCommentFailure(res));
    }
  } catch (err) {
    dispatch(likeCommentFailure(`Failed to like comment: ${err}`));
  }
};

export const unlikeCommentAction = (commentId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(unlikeCommentRequest());
    const { success, res } = await clientFetch("/api/comment/unlike", {
      body: { commentId },
    });
    if (success) {
      dispatch(unlikeCommentSuccess(res.commentLike));
    } else {
      dispatch(unlikeCommentFailure(res));
    }
  } catch (err) {
    dispatch(unlikeCommentFailure(`Failed to unlike comment: ${err}`));
  }
};
