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
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "./constants";

const initialState: AuthState = {
  session: null,
  isAuthenticated: false,
  isFetching: false,
  isSending: false,
  didRequest: false,
};

export const auth = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case ME_REQUEST:
    case GITHUB_LOGIN_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isSending: true,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case GITHUB_LOGIN_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
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
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isSending: false,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GITHUB_LOGIN_FAILURE:
    case RESET_PASSWORD_FAILURE:
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
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isSending: false,
      };
    default:
      return state;
  }
};
