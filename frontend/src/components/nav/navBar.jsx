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
            <h2>Welcome to Bit Clicker</h2>
            <h3>Please log in or sign up to play!</h3>
          </>
        )}
      </div>
    );
  }
}

export default NavBar;
