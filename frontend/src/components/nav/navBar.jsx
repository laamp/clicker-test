import React from "react";

import "../../styles/navbar.scss";

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        {this.props.loggedIn ? (
          <div className="logged-in">
            <h3>Hello, {this.props.currentPlayer.name}</h3>
            <button onClick={this.props.logout}>Log out</button>
          </div>
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
