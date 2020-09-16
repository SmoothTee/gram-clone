import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Home } from "../../pages/Home";
import { meAction } from "../../redux/auth/actions";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(meAction());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
