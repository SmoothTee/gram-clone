import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { auth } from "./auth";
import { profileByUsername, postsByUsername } from "./user";
import { modal } from "./modal";
import { post, postFeed, savedPosts } from "./post";
import { postMedia } from "./postMedia";
import { commentsByPostId } from "./comment";
import { follower, followerSuggestions } from "./follower";
import { entities } from "./entities";
import { error } from "./error";
import { AppReducerParameters } from "./types";
import { LOGOUT_SUCCESS } from "./auth/constants";

export const appReducer = combineReducers({
  auth,
  profileByUsername,
  modal,
  post,
  postFeed,
  postMedia,
  postsByUsername,
  savedPosts,
  commentsByPostId,
  follower,
  followerSuggestions,
  entities,
  error,
});

const rootReducer = (
  state: AppReducerParameters[0],
  action: AppReducerParameters[1]
) => {
  if (action.type === LOGOUT_SUCCESS) window.location.reload();

  return appReducer(state, action);
};

const middlewares = [reduxThunk];

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
