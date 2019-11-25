import React from "react";
import { Link } from "react-router-dom";

import "../styles/notfound.scss";

const NotFound404 = () => (
  <div className="not-found">
    <h1>Not Found 404</h1>
    <p>Sorry, you seem to be lost.</p>
    <Link to="/">Back to the game</Link>
  </div>
);

export default NotFound404;
