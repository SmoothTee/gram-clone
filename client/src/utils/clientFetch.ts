import { ThunkDispatch } from "redux-thunk";

import { store } from "../redux";
import { logoutAction } from "../redux/auth/actions";
import { RootState, ActionTypes } from "../redux/types";

export const clientFetch = async <T>(
  endpoint: string,
  { body, ...opts }: RequestInit | { body: T } = {},
  formData: boolean = false
) => {
  const fetchOpts: RequestInit = {
    method: body ? "POST" : "GET",
    headers: {
      "content-type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
    credentials: "include",
    ...opts,
  };

  if (formData) {
    fetchOpts.headers = undefined;
    fetchOpts.body = body as FormData;
  }

  const res = await fetch(endpoint, fetchOpts);
  const resObj = await res.json();
  if (res.status === 401 && endpoint !== "/api/auth/me") {
    (store.dispatch as ThunkDispatch<RootState, void, ActionTypes>)(
      logoutAction()
    );
  }

  return { success: res.ok, res: resObj };
};
