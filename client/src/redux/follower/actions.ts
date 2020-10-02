import { clientFetch } from "../../utils/clientFetch";
import { User } from "../auth/types";
import { AppThunk } from "../types";
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  READ_FOLLOWER_SUGGESTIONS_FAILURE,
  READ_FOLLOWER_SUGGESTIONS_REQUEST,
  READ_FOLLOWER_SUGGESTIONS_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from "./constants";
import { Follower, FollowerActionTypes } from "./types";

const readFollowerSuggestionsRequest = (): FollowerActionTypes => ({
  type: READ_FOLLOWER_SUGGESTIONS_REQUEST,
});

const readFollowerSuggestionsSuccess = (
  followerSuggestions: User[]
): FollowerActionTypes => ({
  type: READ_FOLLOWER_SUGGESTIONS_SUCCESS,
  followerSuggestions,
});

const readFollowerSuggestionsFailure = (error: any): FollowerActionTypes => ({
  type: READ_FOLLOWER_SUGGESTIONS_FAILURE,
  error,
});

const followRequest = (): FollowerActionTypes => ({
  type: FOLLOW_REQUEST,
});

const followSuccess = (follower: Follower): FollowerActionTypes => ({
  type: FOLLOW_SUCCESS,
  follower,
});

const followFailure = (error: any): FollowerActionTypes => ({
  type: FOLLOW_FAILURE,
  error,
});

const unfollowRequest = (): FollowerActionTypes => ({
  type: UNFOLLOW_REQUEST,
});

const unfollowSuccess = (follower: Follower): FollowerActionTypes => ({
  type: UNFOLLOW_SUCCESS,
  follower,
});

const unfollowFailure = (error: any): FollowerActionTypes => ({
  type: UNFOLLOW_FAILURE,
  error,
});

export const readFollowerSuggestionsAction = (): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(readFollowerSuggestionsRequest());
    const { success, res } = await clientFetch("/api/follower/suggestions");
    if (success) {
      dispatch(readFollowerSuggestionsSuccess(res.suggestions));
    } else {
      dispatch(readFollowerSuggestionsFailure(res));
    }
  } catch (err) {
    dispatch(
      readFollowerSuggestionsFailure(
        `Failed to read follower suggestions: ${err}`
      )
    );
  }
};

export const followAction = (userId: number): AppThunk => async (dispatch) => {
  try {
    dispatch(followRequest());
    const { success, res } = await clientFetch("/api/follower/follow", {
      body: { userId },
    });
    if (success) {
      dispatch(followSuccess(res.follower));
    } else {
      dispatch(followFailure(res));
    }
  } catch (err) {
    dispatch(followFailure(`Failed to follow: ${err}`));
  }
};

export const unfollowAction = (userId: number): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(unfollowRequest());
    const { success, res } = await clientFetch("/api/follower/unfollow", {
      body: { userId },
    });
    if (success) {
      dispatch(unfollowSuccess(res.follower));
    } else {
      dispatch(unfollowFailure(res));
    }
  } catch (err) {
    dispatch(unfollowFailure(`Failed to unfollow: ${err}`));
  }
};
