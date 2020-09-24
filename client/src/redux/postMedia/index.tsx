import { READ_POSTS_SUCCESS, READ_POST_SUCCESS } from "../post/constants";
import { ActionTypes } from "../types";
import { READ_PROFILE_SUCCESS } from "../user/constants";
import { PostMediaState } from "./types";

const initialState: PostMediaState = {
  byPostId: {},
};

export const postMedia = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case READ_POSTS_SUCCESS:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          ...action.postMedia.reduce<{ [key: number]: number[] }>(
            (acc, curr) => {
              if (acc[curr.post_id]) {
                acc[curr.post_id].push(curr.id);
              } else {
                acc[curr.post_id] = [curr.id];
              }
              return acc;
            },
            {}
          ),
        },
      };
    case READ_POST_SUCCESS:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          [action.post.id]: action.postMedia.map((pM) => pM.id),
        },
      };
    case READ_PROFILE_SUCCESS:
      return {
        ...state,
        byPostId: {
          ...state.byPostId,
          ...action.postMedia.reduce<{ [key: number]: number[] }>(
            (acc, curr) => {
              acc[curr.post_id] = [curr.id];
              return acc;
            },
            {}
          ),
        },
      };
    default:
      return state;
  }
};
