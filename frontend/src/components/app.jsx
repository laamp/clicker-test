import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";

import Game from "./game";
import NavBarContainer from "./nav/navBarContainer";
import SessionFormContainer from "./session/sessionFormContainer";
import NotFound404 from "./notFound404";
import LeaderboardContainer from "./leaderboard/leaderboardContainer";

const App = () => (
  <>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/" component={Game} />
      <AuthRoute exact path="/login" component={SessionFormContainer} />
      <Route path="*" component={NotFound404} />
    </Switch>
    <LeaderboardContainer />
  </>
);

export default App;
