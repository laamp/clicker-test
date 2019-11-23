import React from "react";

const ProgressBar = props => (
  <div className="progress-bar-container">
    <div className="progress-bar" style={{ width: `${props.progress}%` }}></div>
  </div>
);

export default ProgressBar;
