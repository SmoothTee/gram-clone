import { clientFetch } from "../../utils/clientFetch";
import { User } from "../auth/types";
import { AppThunk } from "../types";
import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  READ_POSTS_FAILURE,
  READ_POSTS_REQUEST,
  READ_POSTS_SUCCESS,
  SAVE_POST_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNSAVE_POST_FAILURE,
  UNSAVE_POST_REQUEST,
  UNSAVE_POST_SUCCESS,
} from "./constants";
import { PostActionTypes, Post, PostMedia, PostLike, SavedPost } from "./types";
import { PostComment } from "../comment/types";

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

const readPostsRequest = (): PostActionTypes => ({
  type: READ_POSTS_REQUEST,
});

const readPostsSuccess = (data: {
  posts: Post[];
  users: User[];
  postMedia: PostMedia[];
  comments: PostComment[];
}): PostActionTypes => ({
  type: READ_POSTS_SUCCESS,
  posts: data.posts,
  users: data.users,
  postMedia: data.postMedia,
  comments: data.comments,
});

const readPostsFailure = (error: any): PostActionTypes => ({
  type: READ_POSTS_FAILURE,
  error,
});

const likePostRequest = (): PostActionTypes => ({
  type: LIKE_POST_REQUEST,
});

const likePostSuccess = (like: PostLike): PostActionTypes => ({
  type: LIKE_POST_SUCCESS,
  like,
});

const likePostFailure = (error: any): PostActionTypes => ({
  type: LIKE_POST_FAILURE,
  error,
});

const unlikePostRequest = (): PostActionTypes => ({
  type: UNLIKE_POST_REQUEST,
});

const unlikePostSuccess = (like: PostLike): PostActionTypes => ({
  type: UNLIKE_POST_SUCCESS,
  like,
});

const unlikePostFailure = (error: any): PostActionTypes => ({
  type: UNLIKE_POST_FAILURE,
  error,
});

const savePostRequest = (): PostActionTypes => ({
  type: SAVE_POST_REQUEST,
});

const savePostSuccess = (savedPost: SavedPost): PostActionTypes => ({
  type: SAVE_POST_SUCCESS,
  savedPost,
});

const savePostFailure = (error: any): PostActionTypes => ({
  type: SAVE_POST_FAILURE,
  error,
});

const unsavePostRequest = (): PostActionTypes => ({
  type: UNSAVE_POST_REQUEST,
});

const unsavePostSuccess = (unsavedPost: SavedPost): PostActionTypes => ({
  type: UNSAVE_POST_SUCCESS,
  unsavedPost,
});

const unsavePostFailure = (error: any): PostActionTypes => ({
  type: UNSAVE_POST_FAILURE,
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

export const readPostsAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(readPostsRequest());
    const { success, res } = await clientFetch("/api/post");
    if (success) {
      dispatch(readPostsSuccess(res));
    } else {
      dispatch(readPostsFailure(res));
    }
  } catch (err) {
    dispatch(readPostsFailure(`Failed to read posts: ${err}`));
  }
};

export const likePostAction = (postId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(likePostRequest());
    const { success, res } = await clientFetch("/api/post/like", {
      body: { postId },
    });
    if (success) {
      dispatch(likePostSuccess(res.like));
    } else {
      dispatch(likePostFailure(res));
    }
  } catch (err) {
    dispatch(likePostFailure(`Failed to like post. ${err}`));
  }
};

export const unlikePostAction = (postId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(unlikePostRequest());
    const { success, res } = await clientFetch("/api/post/unlike", {
      body: { postId },
    });
    if (success) {
      dispatch(unlikePostSuccess(res.like));
    } else {
      dispatch(unlikePostFailure(res));
    }
  } catch (err) {
    dispatch(unlikePostFailure(`Failed to unlike post: ${err}`));
  }
};

export const savePostAction = (postId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(savePostRequest());
    const { success, res } = await clientFetch("/api/post/save", {
      body: { postId },
    });
    if (success) {
      dispatch(savePostSuccess(res.savedPost));
    } else {
      dispatch(savePostFailure(res));
    }
  } catch (err) {
    dispatch(savePostFailure(`Failed to save post: ${err}`));
  }
};

export const unsavePostAction = (postId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(unsavePostRequest());
    const { success, res } = await clientFetch("/api/post/unsave", {
      body: { postId },
    });
    if (success) {
      dispatch(unsavePostSuccess(res.unsavedPost));
    } else {
      dispatch(unsavePostFailure(res));
    }
  } catch (err) {
    dispatch(unsavePostFailure(`Failed to unsave post: ${err}`));
  }
};
