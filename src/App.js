import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Router from './components/Router';

function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
