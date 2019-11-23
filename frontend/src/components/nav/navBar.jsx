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
          <>
            <h1>Welcome to Bit Clicker</h1>
            <h2>Please log in or sign up to play!</h2>
          </>
        )}
      </div>
    );
  }
}

export default NavBar;
