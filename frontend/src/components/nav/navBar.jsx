import React from "react";

import "../../styles/navbar.scss";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        {this.props.loggedIn ? (
          <>
            <p>Hello, {this.props.currentPlayer.name}</p>
            <button onClick={this.props.logout}>Log out</button>
          </>
        ) : (
          <p>Please log in to play</p>
        )}
      </div>
    );
  }
}

export default NavBar;
