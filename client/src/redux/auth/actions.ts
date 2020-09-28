import { User, AuthActionTypes } from "./types";
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  GITHUB_LOGIN_FAILURE,
  GITHUB_LOGIN_REQUEST,
  GITHUB_LOGIN_SUCCESS,
} from "./constants";
import { AppThunk } from "../types";
import { clientFetch } from "../../utils/clientFetch";
import { resetError } from "../error/actions";

const registerRequest = (): AuthActionTypes => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (user: User): AuthActionTypes => ({
  type: REGISTER_SUCCESS,
  user,
});

const registerFailure = (error: any): AuthActionTypes => ({
  type: REGISTER_FAILURE,
  error,
});

const loginRequest = (): AuthActionTypes => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user: User): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  user,
});

const loginFailure = (error: any): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  error,
});

const logoutRequest = (): AuthActionTypes => ({
  type: LOGOUT_REQUEST,
});

const logoutSuccess = (): AuthActionTypes => ({
  type: LOGOUT_SUCCESS,
});

const logoutFailure = (error?: any): AuthActionTypes => ({
  type: LOGOUT_FAILURE,
  error,
});

const meRequest = (): AuthActionTypes => ({
  type: ME_REQUEST,
});

const meSuccess = (user: User): AuthActionTypes => ({
  type: ME_SUCCESS,
  user,
});

const meFailure = (error: any): AuthActionTypes => ({
  type: ME_FAILURE,
  error,
});

const githubLoginRequest = (): AuthActionTypes => ({
  type: GITHUB_LOGIN_REQUEST,
});

const githubLoginSuccess = (user: User): AuthActionTypes => ({
  type: GITHUB_LOGIN_SUCCESS,
  user,
});

const githubLoginFailure = (error: any): AuthActionTypes => ({
  type: GITHUB_LOGIN_FAILURE,
  error,
});

export const registerAction = <T>(body: T): AppThunk => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const { success, res } = await clientFetch<T>("/api/auth/register", {
      body,
    });
    if (success) {
      dispatch(resetError());
      dispatch(registerSuccess(res.user));
    } else {
      dispatch(registerFailure(res));
    }
  } catch (err) {
    dispatch(registerFailure(`Failed to register: ${err}`));
  }
};

export const loginAction = <T>(body: T): AppThunk => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { success, res } = await clientFetch<T>("/api/auth/login", {
      body,
    });
    if (success) {
      dispatch(resetError());
      dispatch(loginSuccess(res.user));
    } else {
      dispatch(loginFailure(res));
    }
  } catch (err) {
    dispatch(loginFailure(`Failed to login: ${err}`));
  }
};

export const logoutAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    const { success, res } = await clientFetch("/api/auth/logout");
    if (success && res.success) {
      dispatch(logoutSuccess());
    } else {
      dispatch(logoutFailure());
    }
  } catch (err) {
    dispatch(logoutFailure(`Failed to logout: ${err}`));
  }
};

export const meAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(meRequest());
    const { success, res } = await clientFetch("/api/auth/me");
    if (success) {
      dispatch(meSuccess(res.user));
    } else {
      dispatch(meFailure(res));
    }
  } catch (err) {
    dispatch(meFailure(`Failed to me: ${err}`));
  }
};

export const githubLoginAction = (code: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(githubLoginRequest());
    const { success, res } = await clientFetch("/api/auth/github-login", {
      body: { code },
    });
    if (success) {
      dispatch(githubLoginSuccess(res.user));
    } else {
      dispatch(githubLoginFailure(res));
    }
  } catch (err) {
    dispatch(githubLoginFailure(`Failed to login with github: ${err}`));
  }
};
