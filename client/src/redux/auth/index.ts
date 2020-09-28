import { AuthState, AuthActionTypes } from "./types";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  GITHUB_LOGIN_REQUEST,
  GITHUB_LOGIN_SUCCESS,
  GITHUB_LOGIN_FAILURE,
} from "./constants";

const initialState: AuthState = {
  session: null,
  isAuthenticated: false,
  isFetching: false,
  didRequest: false,
};

export const auth = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case ME_REQUEST:
    case GITHUB_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GITHUB_LOGIN_SUCCESS:
      return {
        ...state,
        session: action.user.id,
        isAuthenticated: true,
        isFetching: false,
      };
    case ME_SUCCESS:
      return {
        ...state,
        session: action.user.id,
        isAuthenticated: true,
        isFetching: false,
        didRequest: true,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GITHUB_LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case ME_FAILURE:
      return {
        ...state,
        isFetching: false,
        didRequest: true,
      };
    default:
      return state;
  }
};
