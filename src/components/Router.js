import React from "react";
import { BrowserRouter, Route,Switch } from "react-router-dom";
import { Dashboard, Error, Login } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
