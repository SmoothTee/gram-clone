import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { Loading } from "../../components/Loading";
import { githubLoginAction } from "../../redux/auth/actions";
import { useTypedSelector } from "../../redux/hooks";

export const Github = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { isAuthenticated, isFetching } = useTypedSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");

    if (code) {
      dispatch(githubLoginAction(code));
    }
  }, []);

  if (isFetching || !isAuthenticated) {
    return <Loading />;
  } else {
    return <Redirect to="/" />;
  }
};
