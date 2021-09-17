import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

// dev-ugbnva-7.us.auth0.com
//rKhQlswG0KBd5fpYK7DqEs1HIVejONiW
const Domain=  process.env.REACT_APP_DOMAIN; 
const CLientId = process.env.REACT_APP_CLIENT_ID;
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={Domain}
      clientId={CLientId}
      redirectUri={window.location.origin}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
