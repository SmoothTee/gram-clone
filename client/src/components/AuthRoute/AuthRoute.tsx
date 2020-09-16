import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useTypedSelector } from "../../redux/hooks";

interface AuthRouteProps extends RouteProps {
  children: ReactNode;
}

export const AuthRoute = ({ children, ...props }: AuthRouteProps) => {
  const isAuthenticated = useTypedSelector(
    (state) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <Route {...props}>{children}</Route>;
};
