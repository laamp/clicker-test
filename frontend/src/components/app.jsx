import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";

import GameContainer from "./game/gameContainer";
import NavBarContainer from "./nav/navBarContainer";
import SessionFormContainer from "./session/sessionFormContainer";
import NotFound404 from "./notFound404";
import LeaderboardContainer from "./leaderboard/leaderboardContainer";

import "../styles/app.scss";

const App = () => (
  <>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/" component={GameContainer} />
      <AuthRoute exact path="/login" component={SessionFormContainer} />
      <Route path="*" component={NotFound404} />
    </Switch>
    <LeaderboardContainer />
  </>
);

export default App;
