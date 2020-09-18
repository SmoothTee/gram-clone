import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
} from "./constants";
import { PostActionTypes } from "./types";

const initialState = {
  isCreating: false,
};

export const post = (state = initialState, action: PostActionTypes) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return {
        ...state,
        isCreating: true,
      };
    case CREATE_POST_SUCCESS:
    case CREATE_POST_FAILURE:
      return {
        ...state,
        isCreating: false,
      };
    default:
      return state;
  }
};
