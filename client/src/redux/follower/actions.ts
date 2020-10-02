import { clientFetch } from "../../utils/clientFetch";
import { User } from "../auth/types";
import { AppThunk } from "../types";
import {
  READ_FOLLOWER_SUGGESTIONS_FAILURE,
  READ_FOLLOWER_SUGGESTIONS_REQUEST,
  READ_FOLLOWER_SUGGESTIONS_SUCCESS,
} from "./constants";
import { FollowerActionTypes } from "./types";

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
