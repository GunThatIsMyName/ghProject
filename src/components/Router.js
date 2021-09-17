import React from "react";
import { BrowserRouter, Route,Switch } from "react-router-dom";
import { Dashboard, Error, Login, PrivateRoute,AuthWrapper } from "../pages";

const Router = () => {
  return (
    <AuthWrapper>
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact children={<Dashboard />} />
        <Route path="/login" component={Login} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
    </AuthWrapper>
  );
};

export default Router;
