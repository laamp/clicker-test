import React from "react";
import Cubit from "../game/cubit/cubit";

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
            <h1>
              <Cubit color="#b085f5" />
              Welcome to Bit Clicker
              <Cubit color="#819ca9" />
            </h1>
            <h2>Please log in or sign up to play!</h2>
          </>
        )}
      </div>
    );
  }
}

export default NavBar;
