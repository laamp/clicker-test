import React from "react";

import "../../../styles/cubit.scss";

const Cubit = props => (
  <div className="cubit-container">
    <div className="cubit" style={{ animationDuration: props.speed }}>
      <div className="front" style={{ backgroundColor: props.color }}></div>
      <div className="back" style={{ backgroundColor: props.color }}></div>
      <div className="right" style={{ backgroundColor: props.color }}></div>
      <div className="left" style={{ backgroundColor: props.color }}></div>
      <div className="top" style={{ backgroundColor: props.color }}></div>
      <div className="bottom" style={{ backgroundColor: props.color }}></div>
    </div>
  </div>
);

export default Cubit;
