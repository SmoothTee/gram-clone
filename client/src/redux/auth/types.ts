import {
  REGISTER_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ME_REQUEST,
  ME_SUCCESS,
  ME_FAILURE,
  GITHUB_LOGIN_REQUEST,
  GITHUB_LOGIN_SUCCESS,
  GITHUB_LOGIN_FAILURE,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
} from "./constants";

export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  num_of_posts: number;
  num_of_followers: number;
  num_of_followings: number;
  website?: string;
  bio?: string;
}

export interface AuthState {
  session: number | null;
  isAuthenticated: boolean;
  isFetching: boolean;
  didRequest: boolean;
}

interface RegisterRequestAction {
  type: typeof REGISTER_REQUEST;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  user: User;
}

interface RegisterFailureAction {
  type: typeof REGISTER_FAILURE;
  error: any;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  user: User;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  error: any;
}

interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

interface LogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  error: any;
}

interface MeRequestAction {
  type: typeof ME_REQUEST;
}

interface MeSuccessAction {
  type: typeof ME_SUCCESS;
  user: User;
}

interface MeFailureAction {
  type: typeof ME_FAILURE;
  error: any;
}

interface GithubLoginRequestAction {
  type: typeof GITHUB_LOGIN_REQUEST;
}

interface GithubLoginSuccessAction {
  type: typeof GITHUB_LOGIN_SUCCESS;
  user: User;
}

interface GithubLoginFailureAction {
  type: typeof GITHUB_LOGIN_FAILURE;
  error: any;
}

interface ForgotPasswordRequestAction {
  type: typeof FORGOT_PASSWORD_REQUEST;
}

interface ForgotPasswordSuccessAction {
  type: typeof FORGOT_PASSWORD_SUCCESS;
}

interface ForgotPasswordFailureAction {
  type: typeof FORGOT_PASSWORD_FAILURE;
  error: any;
}

export type AuthActionTypes =
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutRequestAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | MeRequestAction
  | MeSuccessAction
  | MeFailureAction
  | GithubLoginRequestAction
  | GithubLoginSuccessAction
  | GithubLoginFailureAction
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction;
