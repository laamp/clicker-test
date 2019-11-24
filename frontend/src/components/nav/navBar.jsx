import React from "react";

import "../../styles/navbar.scss";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.savePlayerState(this.props.currentPlayer.id, {
      lastLoggedIn: Date.now()
    });
    this.props.logout();
  }

  render() {
    return (
      <div className="navbar">
        {this.props.loggedIn ? (
          <div className="logged-in">
            <h3>Hello, {this.props.currentPlayer.name}</h3>
            <button onClick={this.logout}>Log out</button>
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
