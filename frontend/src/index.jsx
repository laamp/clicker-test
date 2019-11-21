import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/sessionApiUtil";
import { logout } from "./actions/sessionActions";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  // check if player still has a valid token
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedPlayer = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, player: decodedPlayer }
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;
    if (decodedPlayer.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    store = configureStore({});
  }

  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
