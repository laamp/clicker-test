import React from "react";

class NavBar extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <p>This is your nav bar.</p>
        {this.props.loggedIn ? (
          <>
            <p>Hello, PLAYERNAME</p>
            <button onClick={this.props.logout}>Log out</button>
          </>
        ) : (
          <p>Please log in to play</p>
        )}
      </>
    );
  }
}

export default NavBar;
