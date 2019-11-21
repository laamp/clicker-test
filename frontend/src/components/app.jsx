import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch } from "react-router-dom";

import LandingPage from "./landingPage";
import NavBarContainer from "./nav/navBarContainer";
import SessionFormContainer from "./session/sessionFormContainer";

const App = () => (
  <>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/" component={LandingPage} />
      <AuthRoute exact path="/login" component={SessionFormContainer} />
    </Switch>
  </>
);

export default App;
