import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { useTypedSelector } from "../../redux/hooks";

interface ProtectedRouteProps extends RouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children, ...props }: ProtectedRouteProps) => {
  const isAuthenticated = useTypedSelector(
    (state) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Route {...props}>{children}</Route>;
  }

  return <Redirect to="/" />;
};
